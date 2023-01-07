import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import "./style.css";
import LayoutHeader from "./Header";
import LayoutFooter from "./Footer";
import LayoutCart from "./Cart";
import ForbiddenCartModal from "../../components/Modals/ForbiddenCart";
import { useHistory } from "react-router-dom";
import { BlueLakeMenuContext } from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  setForceCartToOpen,
  setGodMode,
} from "@/react-apps/store/reducers/main/actions";
import DepartamentHeader from "./DepartamentsHeader";
import LocationBar from './LocationBar'
import AsideOverflowMenu from "./Menu/AsideOverflowMenu";
import FloatAsideContent from "./FloatAsideContent";
import FantasticRootModal from "@/react-apps/components/FantasticRootModal";

export namespace BlueLagumLayout {
  export type Params = {
    children: ReactNode;
    isClient: boolean;
  };
}

export const BlueLagumContext = React.createContext<any>({});

const FloatAsideContentHandler = () => {
  const [content, setContent] = useState(null);
  const [rightContent, setRightContent] = useState(null);
  return { content, setContent, rightContent, setRightContent };
};

const BlueLagumLayout: React.FunctionComponent<BlueLagumLayout.Params> = ({
  children,
  isClient = true,
}) => {
  const dispatch = useDispatch();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const { user, force_cart_to_open } = useSelector(
    (state: any) => state.main
  );

  useEffect(() => {
    if (force_cart_to_open == false) return;
    dispatch(setForceCartToOpen(false));
    setShowCart(true);
  }, [force_cart_to_open]);

  const history = useHistory();
  const [showCart, setShowCart] = useState(false);
  const menuContext = BlueLakeMenuContext({ user });
  const asideFloat = FloatAsideContentHandler();

  const handleHeaderChange = (key: string) => {
    if (!user) {
      setShowWarningModal(true);
      return;
    }

    switch (key) {
      case "BUDGETS":
        history.push("/cotacoes");
        break;
      case "CART":
        setShowCart(!showCart);
        break;
    }
  };

  const handleForbidden = (n: any) => {
    switch (n) {
      case 2:
        history.push("/login?v=signup");
        break;
    }
    setShowWarningModal(false);
  };

  return (
    <BlueLagumContext.Provider value={{ asideFloat }}>
      <div className={`blue-lagum ${""}`}>
        <LayoutCart
          show={showCart}
          onClose={() => setShowCart(false)}
        ></LayoutCart>
        <AsideOverflowMenu
          user={user}
          context={menuContext}
        ></AsideOverflowMenu>
        {/* Pre rendered side modals */}
        <FloatAsideContent show={asideFloat.content}>
          {" "}
          {asideFloat.content}{" "}
        </FloatAsideContent>
        <FloatAsideContent anchor={"right"} show={asideFloat.rightContent}>
          {" "}
          {asideFloat.rightContent}{" "}
        </FloatAsideContent>
        <div className="top-content">{ <LocationBar></LocationBar>}</div>
        <header>
          <LayoutHeader
            menuContext={menuContext}
            onChange={handleHeaderChange}
          ></LayoutHeader>
        </header>
        <div className="header-bottom-content">
          <DepartamentHeader />
        </div>

        <main>{children}</main>
        <footer>
          <LayoutFooter></LayoutFooter>
        </footer>
        <FantasticRootModal show={showWarningModal}>
          <ForbiddenCartModal onChange={handleForbidden} />
        </FantasticRootModal>
      </div>
    </BlueLagumContext.Provider>
  );
};
export default BlueLagumLayout;
