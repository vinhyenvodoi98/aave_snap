
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
        <h1 className='text-center m-8'>
          Welcome to <span className='text-[#FF4081]'>Aave-snap</span>
        </h1>
        { !isMetaMaskReady &&
          <div className='m-8'>
            <InstallFlask />
          </div>
        }

        <div className='grid grid-cols-2 gap-4'>
          {!state.installedSnap && (
            <div className='m-8'>
              <Card
                title='Connect'
                content='Get started by connecting to and installing the example snap'
                button={
                  <CustomButton
                    onClick={handleConnectClick}
                    disabled={!isMetaMaskReady}
                  >
                    <FlaskBox/>
                    Connect
                  </CustomButton>
                }
              />
            </div>
          )}

          {shouldDisplayReconnectButton(state.installedSnap) && (
            <div className='m-8'>
              <Card
                title='Reconnect'
                content='While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.'
                button={
                  <CustomButton
                    onClick={handleConnectClick}
                    disabled={!state.installedSnap}
                  >
                    <FlaskBox/>
                    Reconnect
                  </CustomButton>
                }
              />
            </div>
          )}

          <div className='m-8'>
            <Card
              title='Send Hello message'
              content='Display a custom message within a confirmation screen in MetaMask.'
              button={<CustomButton
                onClick={handleSendHelloClick}
                disabled={!state.installedSnap}
              >
                Send message
              </CustomButton>}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
