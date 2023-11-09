import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();

  await deploy('MotobloqToken', {
    from: deployer,
    args: ["0xCDA0295D02F11d0d2395B302C86c0E3E85eFCA2f", 500],
    log: true,
    autoMine: true,
  });
}

export default func;
func.tags = ['MotobloqToken'];