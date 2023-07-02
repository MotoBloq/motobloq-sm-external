import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();

  await deploy('MotobloqToken', {
    from: deployer,
    args: ["0x6b0A8a45Ac25E33Cb3dca771B8B830B9d7DBCEa4", 500],
    log: true,
    autoMine: true,
  });
}

export default func;
func.tags = ['MotobloqToken'];