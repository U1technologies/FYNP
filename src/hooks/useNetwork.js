/**
 * FYNP useNetwork Hook
 * Network connectivity monitoring
 */

import {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState(null);
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
      setIsInternetReachable(state.isInternetReachable);
    });

    // Fetch initial network state
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
      setIsInternetReachable(state.isInternetReachable);
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * Manually refresh network status
   */
  const refreshNetworkStatus = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);
    setConnectionType(state.type);
    setIsInternetReachable(state.isInternetReachable);
    return state;
  };

  /**
   * Check if connection is WiFi
   */
  const isWiFi = () => {
    return connectionType === 'wifi';
  };

  /**
   * Check if connection is cellular
   */
  const isCellular = () => {
    return connectionType === 'cellular';
  };

  return {
    isConnected,
    connectionType,
    isInternetReachable,
    isWiFi,
    isCellular,
    refreshNetworkStatus,
  };
};

export default useNetwork;
