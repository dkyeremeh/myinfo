import { postJSON } from 'shared/build/http';

export const requestScan = (user: Record<string, any>) => {
  postJSON(`${process.env.MYINFO_SCANNER_URL}/scan`, user).catch((err) =>
    console.error('Failed to request scan', err)
  );
};
