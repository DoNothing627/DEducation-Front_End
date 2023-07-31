import { getNonce, NonceRequestDTO } from "@app/api/auth/get-nonce";
import {
  defaultDEducationLogo,
  defaultMetamaskLogo,
} from "@app/const/common.const";
import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { ethers, Signer } from "ethers";
import web3 from "web3";
import { useEffect, useState } from "react";
import "./auth.scss";
import { handleError } from "@app/dekits/error-handler";
import { verifySignature } from "@app/api/auth/verify-signature";
import { getAccessToken, saveUserCredential } from "@app/services/auth";
import { useRouter } from "next/router";
import { useSession } from "@app/hooks/session";

export function Auth() {
  // const [nonceRequestDTO, setNonceRequestDTO] = useState<NonceRequestDTO>(
  //   {} as NonceRequestDTO
  // );
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const router = useRouter();
  const { isLoggedIn, userInfo } = useSession();

  var nonceRequestDTO: NonceRequestDTO;

  useEffect(() => {
    if (getAccessToken()) router.push("/home");
  });

  useEffect(() => {
    console.log("session", isLoggedIn, userInfo);
    if (isLoggedIn) {
      router.back();
    }
  }, [isLoggedIn, router]);

  const getAddress = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const addr = await signer.getAddress();
      nonceRequestDTO = { wallet: addr };
      setSigner(signer);
    } catch (err) {
      throw err;
    }
  };

  const handleGetNonce = async () => {
    await getAddress();
    getNonce(nonceRequestDTO).subscribe(async (res) => {
      console.log(res.data);
      try {
        let flatSig = await signer?.signMessage(
          `I am signing my one-time nonce: ${res.data.nonce}`
        );
        let sig = await ethers.utils.splitSignature(flatSig as string);

        const verifySignatureDTO = {
          wallet: nonceRequestDTO.wallet,
          signature: sig,
        };

        verifySignature(verifySignatureDTO).subscribe((res: any) => {
          console.log(res.data);
          saveUserCredential(res.data.token);
          localStorage.setItem("user_role", res.data.role);
          localStorage.setItem("wallet", res.data.wallet);
          // router.push("/");
          // window.location.href = `${(router.query.prev as string) || "/"}`;
          window.location.href = "/";
        });
      } catch (err) {
        handleError()(err);
      }
    });
  };
  return (
    <>
      <div className="auth-wrap">
        <div className="auth-background">
          <div className="de-nav">
            <div className="de-brand-name">DEducation</div>
            <div className="de-login-button" onClick={handleGetNonce}>
              <img className="de-metamask-logo" src={defaultMetamaskLogo} />
              Login by Metamask
            </div>
          </div>
          <div className="auth-container">
            <div className="de-content">
              <div className="de-description">
                Welcome to your professional community
              </div>
              <div className="de-option">
                Search for a job
                <ArrowForwardIosOutlined />
              </div>
              <div className="de-option">
                Learn a skill
                <ArrowForwardIosOutlined />
              </div>
              <div className="de-option">
                Find a person you know
                <ArrowForwardIosOutlined />
              </div>
            </div>
            <img className="de-logo" src={defaultDEducationLogo} />
          </div>
        </div>
        <div className="auth-footer">
          <div className="de-footer-column">
            <div>About</div>
            <div>Accessibility</div>
            <div>User Agreement</div>
          </div>
          <div className="de-footer-column">
            <div>Privacy Policy</div>
            <div>Cookie Policy</div>
            <div>Copyright Policy</div>
          </div>
          <div className="de-footer-column">
            <div>Brand Policy</div>
            <div>Guest Controls</div>
            <div>Community Guidelines</div>
          </div>
          <div className="de-footer-column">
            <div>@2022</div>
          </div>
        </div>
      </div>
    </>
  );
}
