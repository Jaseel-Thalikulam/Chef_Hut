export interface ISendOTP {
    email: string;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;
    setOtpSend?: React.Dispatch<React.SetStateAction<boolean>>;
  }