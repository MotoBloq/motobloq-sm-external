import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer, royaltyReceiver} = await getNamedAccounts();

  await deploy('MotobloqToken', {
    from: deployer,
    args: [royaltyReceiver, 500],
    log: true,
    autoMine: true,
  });
}

export default func;
func.tags = ['MotobloqToken'];