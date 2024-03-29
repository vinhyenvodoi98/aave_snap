import { useContext } from 'react';

import { MetamaskActions, MetaMaskContext } from '@/hooks';

import { CustomButton } from '@/components/Button';
import Card from '@/components/Card';
import FlaskBox from '@/components/FlaskBox';
import InstallFlask from '@/components/InstallFlask';
import Layout from '@/components/layout/Layout';

import { defaultSnapOrigin } from '@/config';

import {
  connectSnap,
  getSnap,
  isLocalSnap,
  sendHello,
  shouldDisplayReconnectButton,
} from '../utils';

export default function HomePage() {
  const [state, dispatch] = useContext(MetaMaskContext);

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? state.isFlask
    : state.snapsDetected;

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  const handleSendHelloClick = async () => {
    try {
      await sendHello();
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  return (
    <Layout>
      <div className='container mx-auto'>
        <h1 className='my-8 text-center'>
          Welcome to <span className='text-[#FF4081]'>Aave-snap</span>
        </h1>
        {!isMetaMaskReady && (
          <div className='my-8'>
            <InstallFlask />
          </div>
        )}

        <div className='grid grid-cols-2 gap-8'>
          {!state.installedSnap && (
            <div className='my-8'>
              <Card
                title='Connect'
                content='Get started by connecting to and installing the example snap'
                button={
                  <CustomButton
                    onClick={handleConnectClick}
                    disabled={!isMetaMaskReady}
                  >
                    <FlaskBox />
                    Connect
                  </CustomButton>
                }
              />
            </div>
          )}

          {shouldDisplayReconnectButton(state.installedSnap) && (
            <div className='my-8'>
              <Card
                title='Reinstall'
                content='Reinstall metamask snap'
                button={
                  <CustomButton
                    onClick={handleConnectClick}
                    disabled={!state.installedSnap}
                  >
                    <FlaskBox />
                    Reinstall
                  </CustomButton>
                }
              />
            </div>
          )}

          <div className='my-8'>
            <Card
              title='Check AAVE Pool Info'
              content="Displays information about aave's pools"
              button={
                <CustomButton
                  onClick={handleSendHelloClick}
                  disabled={!state.installedSnap}
                >
                  Get Pools Infomation
                </CustomButton>
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
