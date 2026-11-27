import assert from "node:assert/strict";
import {execFileSync} from "node:child_process";
import {readFileSync} from "node:fs";
import test from "node:test";

// The package part of ui-source tests/smart-contract-registry.test.mjs. It runs in
// the overlay (ui-source at the pinned revision with this repository laid over
// it): sf-contract walks every smart.manifest.json under src, so the registry it
// builds there holds the free components and the set's one together.
const root = new URL("..", import.meta.url);
const run = (...args) => execFileSync(process.execPath, ["scripts/sf-contract.mjs", ...args], {cwd: root, encoding: "utf8"});

test("the set's editor is generated into the searchable registry beside the free components", () => {
  run("build");
  const registry = JSON.parse(readFileSync(new URL("../contracts/generated/smart-component-contract-registry.json", import.meta.url), "utf8"));
  assert.equal(registry.schema, "simai.smart-component-contract-registry.v2");
  // The free registry's Smart components at the pinned revision (71 at
  // ec2f29df) and the set's one, sf-editor, make 72. At da48ba8f (pair
  // ui-0c23f6a0af12) the free registry holds 81: 82. At 8c13bf45 (pair
  // ui-7fb26d395af2) it holds 83: 84. At 1dd18375 (pair ui-dc9fc39aeb26)
  // it holds 86: 87. At e7ea89e0 (pair ui-9ceecc24c988) it holds 87: 88.
  assert.equal(registry.entries.length, 88);
  assert.ok(registry.entries.some((entry) => entry.id === "smart.editor"), "smart.editor");
  assert.ok(registry.entries.every(({contract_schema}) => contract_schema.version === 2));
});

test("CLI describes and verifies sf-editor", () => {
  const packet = JSON.parse(run("describe", "smart.editor", "--format", "ai"));
  assert.equal(packet.public_abi.custom_element, "sf-editor");
  assert.equal(packet.identity.version, "1.6.1");
  assert.deepEqual(JSON.parse(run("verify", "smart.editor")), {ok: true, verified: ["smart.editor"]});
});
