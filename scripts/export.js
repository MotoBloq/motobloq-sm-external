import fs from "fs";
import path from "path";

const OUT_ABI  = "build/abi";
const OUT_BIN  = "build/bin";

for (const file of fs.readdirSync("artifacts/contracts", {recursive:true})) {
  if (!file.endsWith(".json") || file.endsWith(".dbg.json")) continue;
  const artifact = JSON.parse(fs.readFileSync(path.join("artifacts/contracts", file)));
  const name     = path.basename(file, ".json");
  fs.mkdirSync(OUT_ABI, {recursive:true});
  fs.mkdirSync(OUT_BIN, {recursive:true});
  fs.writeFileSync(`${OUT_ABI}/${name}.abi`, JSON.stringify(artifact.abi));
  fs.writeFileSync(
    `${OUT_BIN}/${name}.bin`,
    artifact.bytecode.replace(/^0x/, "")        // Web3j wants raw hex
  );
}
