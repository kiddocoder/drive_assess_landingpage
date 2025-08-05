import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from 'axios';

type FingerprintContextType = {
  visitorId: string | null;
  loading: boolean;
  geoLocalisation: null
};

const FingerprintContext = createContext<FingerprintContextType>({
  visitorId: null,
  loading: true,
  geoLocalisation: null
});

export const useFingerprint = () => useContext(FingerprintContext);

export const FingerprintProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<FingerprintContextType>({
    visitorId: null,
    loading: true,
    geoLocalisation: null
  })

  useEffect(() => {

    const GEO = async () => await axios.get('https://ipinfo.io/geo').then((res) => {
      const geo = res.data;
      setState({
        ...state,
        geoLocalisation: { ...geo, countryFlag: `https://flagsapi.com/${geo.country}/flat/64.png` }
      })
    })

    const loadFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();

        fp.get()
          .then((result) => {
            setState({
              ...state,
              visitorId: result.visitorId,
              loading: false,
            });
          })
      } catch (error) {
        console.error('Failed to load fingerprint:', error);
        setState(prev => ({
          ...prev,
          loading: false,
        }));
      }
    };

    GEO();
    loadFingerprint();
  }, []);

  return (
    <FingerprintContext.Provider value={state}>
      {children}
    </FingerprintContext.Provider>
  );
};