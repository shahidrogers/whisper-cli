import { describe, test, expect } from "bun:test";
import {
  classifyRisk,
  evaluatePolicy,
  hasSudo,
  hasRedirection,
  hasChaining,
  hasSubshell,
  touchesSensitivePath,
} from "../src/policy";
import { RiskLevel, DEFAULT_CONFIG } from "../src/schema";

describe("Policy Engine - Pattern Detectors", () => {
  test("hasSudo detects sudo usage", () => {
    expect(hasSudo("sudo ls")).toBe(true);
    expect(hasSudo("ls -la")).toBe(false);
    expect(hasSudo("echo sudo")).toBe(false);
  });

  test("hasRedirection detects redirects but not pipes", () => {
    expect(hasRedirection("ls | grep foo")).toBe(false);
    expect(hasRedirection("echo hello > file.txt")).toBe(true);
    expect(hasRedirection("cat file.txt")).toBe(false);
  });

  test("hasChaining detects command chains", () => {
    expect(hasChaining("ls && pwd")).toBe(true);
    expect(hasChaining("ls || pwd")).toBe(true);
    expect(hasChaining("ls ; pwd")).toBe(true);
    expect(hasChaining("ls -la")).toBe(false);
  });

  test("hasSubshell detects subshells", () => {
    expect(hasSubshell("echo $(whoami)")).toBe(true);
    expect(hasSubshell("echo `whoami`")).toBe(true);
    expect(hasSubshell("echo hello")).toBe(false);
  });

  test("touchesSensitivePath detects sensitive paths", () => {
    expect(touchesSensitivePath("rm /etc/passwd")).toBe(true);
    expect(touchesSensitivePath("cat ~/.ssh/id_rsa")).toBe(true);
    expect(touchesSensitivePath("ls /var/log")).toBe(true);
    expect(touchesSensitivePath("ls ./myfile.txt")).toBe(false);
  });
});

describe("Policy Engine - Risk Classification", () => {
  test("classifies safe read-only commands as SAFE", () => {
    expect(classifyRisk("ls -la")).toBe(RiskLevel.SAFE);
    expect(classifyRisk("cat file.txt")).toBe(RiskLevel.SAFE);
    expect(classifyRisk("pwd")).toBe(RiskLevel.SAFE);
    expect(classifyRisk("grep foo bar.txt")).toBe(RiskLevel.SAFE);
    expect(classifyRisk("ps aux")).toBe(RiskLevel.SAFE);
  });

  test("classifies safe git commands as SAFE", () => {
    expect(classifyRisk("git status")).toBe(RiskLevel.SAFE);
    expect(classifyRisk("git diff")).toBe(RiskLevel.SAFE);
    expect(classifyRisk("git log")).toBe(RiskLevel.SAFE);
    expect(classifyRisk("git show")).toBe(RiskLevel.SAFE);
    expect(classifyRisk("git branch")).toBe(RiskLevel.SAFE);
  });

  test("classifies mutation commands as CAUTION", () => {
    expect(classifyRisk("rm file.txt")).toBe(RiskLevel.CAUTION);
    expect(classifyRisk("mv file.txt backup.txt")).toBe(RiskLevel.CAUTION);
    expect(classifyRisk("cp file.txt backup.txt")).toBe(RiskLevel.CAUTION);
    expect(classifyRisk("kill 1234")).toBe(RiskLevel.CAUTION);
    expect(classifyRisk("chmod +x script.sh")).toBe(RiskLevel.CAUTION);
  });

  test("classifies package managers as CAUTION", () => {
    expect(classifyRisk("npm install")).toBe(RiskLevel.CAUTION);
    expect(classifyRisk("brew install foo")).toBe(RiskLevel.CAUTION);
    expect(classifyRisk("pip install requests")).toBe(RiskLevel.CAUTION);
  });

  test("classifies safe commands with safe pipes as SAFE", () => {
    expect(classifyRisk("ls | grep foo")).toBe(RiskLevel.SAFE);
    expect(classifyRisk("lsof -i -P | grep LISTEN")).toBe(RiskLevel.SAFE);
    expect(classifyRisk("ps aux | grep node")).toBe(RiskLevel.SAFE);
  });

  test("classifies commands with output redirection as CAUTION", () => {
    expect(classifyRisk("echo hello > file.txt")).toBe(RiskLevel.CAUTION);
  });

  test("classifies commands with chaining as CAUTION", () => {
    expect(classifyRisk("ls && pwd")).toBe(RiskLevel.CAUTION);
    expect(classifyRisk("ls || pwd")).toBe(RiskLevel.CAUTION);
  });

  test("classifies sudo commands as DANGEROUS", () => {
    expect(classifyRisk("sudo ls")).toBe(RiskLevel.DANGEROUS);
    expect(classifyRisk("sudo rm file.txt")).toBe(RiskLevel.DANGEROUS);
  });

  test("classifies dangerous patterns as DANGEROUS", () => {
    expect(classifyRisk("rm -rf /tmp/test")).toBe(RiskLevel.DANGEROUS);
    expect(classifyRisk("git reset --hard")).toBe(RiskLevel.DANGEROUS);
    expect(classifyRisk("dd if=/dev/zero of=/dev/sda")).toBe(RiskLevel.DANGEROUS);
  });

  test("classifies commands touching sensitive paths as DANGEROUS", () => {
    expect(classifyRisk("rm /etc/passwd")).toBe(RiskLevel.DANGEROUS);
    expect(classifyRisk("cat ~/.ssh/id_rsa")).toBe(RiskLevel.DANGEROUS);
  });

  test("classifies unknown commands as CAUTION", () => {
    expect(classifyRisk("mycustomcommand")).toBe(RiskLevel.CAUTION);
    expect(classifyRisk("foobar --option")).toBe(RiskLevel.CAUTION);
  });
});

describe("Policy Engine - Policy Decisions", () => {
  test("auto-runs SAFE commands when auto_run_safe is true", () => {
    const decision = evaluatePolicy("ls -la", DEFAULT_CONFIG, false);
    expect(decision.allowed).toBe(true);
    expect(decision.riskLevel).toBe(RiskLevel.SAFE);
    expect(decision.requiresConfirmation).toBe(false);
  });

  test("requires confirmation for CAUTION commands", () => {
    const decision = evaluatePolicy("kill 1234", DEFAULT_CONFIG, false);
    expect(decision.allowed).toBe(true);
    expect(decision.riskLevel).toBe(RiskLevel.CAUTION);
    expect(decision.requiresConfirmation).toBe(true);
  });

  test("blocks DANGEROUS commands without arm mode", () => {
    const decision = evaluatePolicy("rm -rf /tmp/test", DEFAULT_CONFIG, false);
    expect(decision.allowed).toBe(false);
    expect(decision.riskLevel).toBe(RiskLevel.DANGEROUS);
    expect(decision.requiresConfirmation).toBe(false);
  });

  test("allows DANGEROUS commands with arm mode but requires confirmation", () => {
    const decision = evaluatePolicy("rm -rf /tmp/test", DEFAULT_CONFIG, true);
    expect(decision.allowed).toBe(true);
    expect(decision.riskLevel).toBe(RiskLevel.DANGEROUS);
    expect(decision.requiresConfirmation).toBe(true);
  });

  test("blocks sudo commands even with arm mode", () => {
    const decision = evaluatePolicy("sudo ls", DEFAULT_CONFIG, true);
    expect(decision.allowed).toBe(false);
    expect(decision.riskLevel).toBe(RiskLevel.DANGEROUS);
  });

  test("respects custom denylist", () => {
    const config = {
      ...DEFAULT_CONFIG,
      custom_denylist: ["docker"],
    };
    const decision = evaluatePolicy("docker ps", config, false);
    expect(decision.allowed).toBe(false);
    expect(decision.blockingRule).toBe("docker");
  });

  test("respects custom allowlist", () => {
    const config = {
      ...DEFAULT_CONFIG,
      custom_allowlist: ["mycustomcommand"],
    };
    const decision = evaluatePolicy("mycustomcommand", config, false);
    expect(decision.allowed).toBe(true);
    expect(decision.riskLevel).toBe(RiskLevel.SAFE);
  });
});
