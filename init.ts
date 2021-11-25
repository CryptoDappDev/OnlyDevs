import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { Alert, Carousel, Collapse, Menu, Slider } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import YouTube from "react-youtube";
import {
  RadialChart,
  VerticalBarSeries,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";
import { GoogleMap } from "@react-google-maps/api";
import {
  ButtonGroup as MuiButtonGroup,
} from "@material-ui/core";

import { CmsGallery, ProductGallery } from "./components/ItemGallery";
import { MuiSelect } from "./components/MuiSelect";
import { DynWiredButton, DynWiredIconButton } from "./components/DynamicWired";
import { ArwesCard } from "./components/Arwes";
import { Figure, Text } from "@arwes/core";
import { Embed } from "./components/Embed";
import { Tilt } from "./components/Tilt";
import { ParallaxWrapper } from "./components/ParallaxWrapper";
import { Reveal } from "./components/Reveal";

import {MuiTheme} from "./components/Mui/MuiTheme"; 
import {MuiButton} from "./components/Mui/MuiButton"; 
import {MuiSubNav} from "./components/Mui/MuiSubNav"; 
import {MuiNavTab} from "./components/Mui/MuiNavTab"; 
import { MuiNavPanel } from "./components/Mui/MuiNavPanel";
import { MuiNavProvider } from "./components/Mui/MuiNavProvider";


import { BitSlider } from "./components/Bit/BitSlider"
import { BitCollapse} from "./components/Bit/BitCollapse"
import { BitCollapseBtn} from "./components/Bit/BitCollapseBtn"
import { BitMetaMaskLogo } from "./components/Bit/BitMetaMaskLogo"

import { BoxFixed } from "./components/Misc/BoxFixed"

import { NftPageContext } from "./components/web3/NftPageContext"
import { NftContext } from "./components/web3/NftContext"
import { WalletContext } from "./components/web3/WalletContext"
import { NftConsumer } from "./components/web3/NftConsumer"

import { NftAsset } from "./components/web3/NftAsset"
import { NftName } from "./components/web3/NftName"


import { LottieContainer } from "./components/lottie/LottieContainer";

// <-- ONLYMEMES.COM PROJECT ID + API TOKEN -->
/*
export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "tmuAPCL8N7XuwKcavmJW8E",
      token: "JCaoR0m0OZnRimzhPSmtgPoyGYlvg34Ga6RbwOzC74KvWKdmNHdlsDRS5kbOAAIYzAaZi0sg8f1cf4wf0KhxA",
    },
  ],
  preview: false,
});
*/

// <-- TEST BENCH PROJECT ID + API TOKEN -->

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "mHWcK7NZcRAyb8v8MxSPJd",
      token:
        "sJVGJPc73tYYSml7c25q4V1l3BZp8GHKXM9ojg2msmeEE6QSNqS5xTQMzAlT8eaIK7Ebn91MKZTn7iFlAEtfA",
    },
  ],
  preview: true,
});


//Lottie
PLASMIC.registerComponent(LottieContainer, {
  name: "LottieContainer",
  props: {
    UrlLottie: "boolean",
    Url: "string",
    Loop: "boolean",
    ActionsClick: "object",
    ActionsClick2: "object",
    ActionsClick2Used: "boolean",
    ActionsClick3: "object",
    ActionsClick3Used: "boolean",
    ActionsClickDown: "object",
    ActionsClickUp: "object",
    ActionsDoubleClick: "object",
    ActionsMouseEnter: "object",
    ActionsMouseLeave: "object",
    InteractionActions: "object",
    OnLoopComplete: "object",
    OnSegmentStart: "object",
    OnLoaded: "object",
    children: "slot",
    DisplayChildren: "boolean",
    eventChildren: "slot",
    DisplayEventChildren: "boolean",
    InteractionActionMode: {
      type: "choice",
      options: ["scroll", "cursor"]
    },
    
    LottieImageFile: {
      type: "choice",
      options: ["Meemo","LowEth","NoAuth","Dots","ConfirmButton","CloseButton","CashWallet"]
    },
    style: "object",
    styleChildren: "object",
    styleEventChildren: "object",
  },
  importPath: "./components/lottie/LottieContainer",
  importName: "LottieContainer",
});

//OpenSea SDK + Web3 Lib Section

PLASMIC.registerComponent(NftPageContext, {
  name: "NftPageContext",
  props: {
    locations: "object",
    overrides: "object",
    page: {
      type:"choice",
      options: [ "Home","Feed","Explore","Roadmap","Profile" ]
    },
    children: "slot",
  },
  importPath: "./components/web3/NftPageContext",
  importName: "NftPageContext",
});


PLASMIC.registerComponent(WalletContext, {
  name: "WalletContext",
  props: {
    login: "boolean",
    accountLogin: "slot",

    fakeName: "string",
    accountName: "boolean",
    accountInfo: "boolean",
    accountAddress: "boolean",
    accountBalance: "boolean",
  
    stateLoggedIn: "boolean",
    accountLoggedIn: "slot",
    stateLoggingIn: "boolean",
    accountLoggingIn: "slot",
    accountNone: "slot",
  },
  importPath: "./components/web3/WalletContext",
  importName: "WalletContext",
});

PLASMIC.registerComponent(NftConsumer, {
  name: "NftConsumer",
  props: {
    name: "boolean",
    image: "boolean",
    thumbnail: "boolean",
    description: "boolean",
    collectionName: "boolean",
    collectionDescription: "boolean",
    ShowCheckOut: "boolean",
    ShowLowEthFlag: "boolean",
    lowEthBuyFiat: "slot",
    ShowSuccessFlag: "boolean",
    ShowUserRejectedFlag: "boolean",
    ShowBuyFiatFlag: "boolean",
    FiatWindowStyle: "object",
    ShowAwaitingOrder: "boolean",
    externalLink: "boolean",
    contract: "boolean",
    tokenId: "boolean",
    numberOfSales: "boolean",
    buySignedIn: "slot",
    buyNotSignedIn: "slot",
    checkout: "slot",
    checkoutBtn: "slot",
    lowEthFlag: "slot",
    successFlag: "slot",
    userRejectedFlag: "slot",
    awaitingOrder: "slot",
    buy: "boolean",
    creator: "boolean",
    creatorImage: "boolean",
    owner: "boolean",
    price: "boolean",
    fit: {
      type: "choice",
      options: ["contain", "cover", "fill", "none", "scale-down"]
    },

    ownerName: "object",
    ownerAddress: "object",
    ownerNumAssets: "object",
    ImageStyle: "object"
    
  },
  importPath: "./components/web3/NftConsumer",
  importName: "NftConsumer",
});


PLASMIC.registerComponent(NftContext, {
  name: "NftContext",
  props: {
    data: "boolean",
    location: "string",
    openseaAddress: "boolean",
    tokenAddress: "string",
    tokenId: "string",
    children: "slot"
  },
  importPath: "./components/web3/NftContext",
  importName: "NftContext",
});

PLASMIC.registerComponent(NftName, {
  name: "NftName",
  props: {
    openseaAddress: "boolean",
    tokenAddress: "string",
    tokenId: "string",
  },
  importPath: "./components/web3/NftName",
  importName: "NftName",
});

PLASMIC.registerComponent(NftAsset, {
  name: "NftAsset",
  props: {
    openseaAddress: "boolean",
    tokenAddress: "string",
    tokenId: "string",
    fit: {
      type: "choice",
      options: ["contain", "cover", "fill", "none", "scale-down"]
    },
  },
  importPath: "./components/web3/NftAsset",
  importName: "NftAsset",
});

//Bit.dev Lib Section

PLASMIC.registerComponent(BitMetaMaskLogo, {
  name: "BitMetaMaskLogo",
  props: {
  },
  importPath: "./components/Bit/BitMetaMaskLogo",
  importName: "BitMetaMaskLogo",
});

PLASMIC.registerComponent(BoxFixed, {
  name: "BoxFixed",
  props: {
    children: "slot",
  },
  importPath: "./components/web3/BoxFixed",
  importName: "BoxFixed",
});

PLASMIC.registerComponent(BitCollapse, {
  name: "BitCollapse",
  props: {
    button: "slot",
    children: "slot",
    show: "boolean",
    direction: {
      type: "choice",
      options: ["vertical", "horizontal"],
    },
  },
  importPath: "./components/Bit/BitCollapse",
  importName: "BitCollapse",
});

PLASMIC.registerComponent(BitCollapseBtn, {
  name: "BitCollapseBtn",
  props: {
    children: "slot",
  },
  importPath: "./components/Bit/BitCollapseBtn",
  importName: "BitCollapseBtn",
});


PLASMIC.registerComponent(BitSlider, {
  name: "BitSlider",
  props: {
    slidesToShow: "number",
    slidesToScroll: "number",
    dots: "boolean",
    infinite: "boolean",
    prevArrow: "slot",
    children: "slot",
    nextArrow: "slot",
  },
  importPath: "./components/Bit/BitSlider",
  importName: "BitSlider",
});

//Material UI Lib Section

PLASMIC.registerComponent(MuiTheme, {
  name: "MuiTheme",
  props: {
    children: "slot",
    disabled: "boolean",
    theme: "object",
    
  },
  importPath: "./components/Mui/MuiTheme",
  importName: "MuiTheme",
});

PLASMIC.registerComponent(MuiNavProvider, {
  name: "MuiNavProvider",
  props: {
    children: "slot",
    disabled: "boolean",
  },
  importPath: "./components/Mui/MuiNavProvider",
  importName: "MuiNavProvider",
});

PLASMIC.registerComponent(MuiSubNav, {
  name: "MuiSubNav",
  props: {
    children: "slot",
    disabled: "boolean",
  },
  importPath: "./components/Mui/MuiSubNav",
  importName: "MuiSubNav",
});

PLASMIC.registerComponent(MuiNavTab, {
  name: "MuiNavTab",
  props: {
    children: "slot",
    disabled: "boolean",
  },
  importPath: "./components/Mui/MuiNavTab",
  importName: "MuiNavTab",
});

PLASMIC.registerComponent(MuiNavPanel, {
  name: "MuiNavPanel",
  props: {
    index: "number",
    children: "slot",
    disabled: "boolean",
  },
  importPath: "./components/Mui/MuiNavPanel",
  importName: "MuiNavPanel",
});


PLASMIC.registerComponent(MuiSelect, {
  name: "MuiSelect",
  props: {
    defaultValue: "string",
    options: "object",
    label: "string",
  },
  importPath: "./components/Mui/MuiSelect",
});

PLASMIC.registerComponent(MuiButtonGroup, {
  name: "MuiButtonGroup",
  props: {
    color: {
      type: "choice",
      options: ["primary", "secondary"],
    },
    variant: {
      type: "choice",
      options: ["contained", "outlined", "text"],
    },
    children: "slot",
  },
  importPath: "@material-ui/core",
  importName: "ButtonGroup",
});

PLASMIC.registerComponent(MuiButton, {
  name: "MuiButton",
  props: {
    children: "slot",
    disabled: "boolean",
    color: {
      type: "choice",
      options: ["primary", "secondary"],
    },
    variant: {
      type: "choice",
      options: ["contained", "outlined", "text"],
    },
    href: "string",
    theme: "object",
  },
  importPath: "./components/Mui/MuiButton",
  importName: "MuiButton",
});


// ** BEGIN DEFAULT COMPONENTS ** //


PLASMIC.registerComponent(Slider, {
  name: "Slider",
  props: {
    disabled: "boolean",
    range: "boolean",
    vertical: "boolean",
  },
  importPath: "antd",
});

PLASMIC.registerComponent(Menu, {
  name: "Menu",
  props: {
    mode: "string",
    theme: "string",
    // We need to use `selectedKeys` instead of `defaultSelectedKeys` to
    // control/toggle the selected keys in the editor.
    selectedKeys: {
      type: "object",
      editOnly: true,
      // However we want the generated code to map the values we set in the
      // editor to `defaultSelectedKeys` (so the selected keys will change as
      // the user selects new items)
      uncontrolledProp: "defaultSelectedKeys",
    },
    children: {
      type: "slot",
      allowedComponents: ["MenuItem"],
    },
  },
  importPath: "antd",
});

PLASMIC.registerComponent(MenuItem, {
  name: "MenuItem",
  props: {
    key: "string",
    children: "slot",
  },
  importPath: "antd/lib/menu/MenuItem",
  isDefaultExport: true,
});

PLASMIC.registerComponent(Collapse, {
  name: "Collapse",
  props: {
    activeKey: {
      type: "object",
      editOnly: true,
      uncontrolledProp: "defaultActiveKey",
    },
    children: {
      type: "slot",
      allowedComponents: ["CollapsePanel"],
    },
  },
  importPath: "antd",
});

PLASMIC.registerComponent(CollapsePanel, {
  name: "CollapsePanel",
  props: {
    header: "slot",
    key: "string",
    children: "slot",
  },
  importPath: "antd/lib/collapse/CollapsePanel",
  isDefaultExport: true,
});

PLASMIC.registerComponent(Alert, {
  name: "Alert",
  props: {
    message: "string",
    description: "slot",
    type: {
      type: "choice",
      options: ["success", "info", "warning", "error"],
    },
    showIcon: "boolean",
  },
  importPath: "antd",
});

PLASMIC.registerComponent(YouTube, {
  name: "YouTube",
  props: {
    videoId: "string",
  },
  importPath: "react-youtube",
  isDefaultExport: true,
});


//Charting


PLASMIC.registerComponent(RadialChart, {
  name: "Radial Chart",
  props: {
    data: "object",
    height: "number",
    width: "number",
  },
  importPath: "react-vis",
  importName: "RadialChart",
});

PLASMIC.registerComponent(XYPlot, {
  name: "XY Plot",
  props: {
    height: "number",
    width: "number",
    xDomain: "object",
    yDomain: "object",
    children: {
      type: "slot",
      allowedComponents: ["X Axis", "Y Axis", "Bar Series"],
    },
  },
  importPath: "react-vis",
  importName: "XYPlot",
});

PLASMIC.registerComponent(XAxis, {
  name: "X Axis",
  props: {},
  importPath: "react-vis",
  importName: "XAxis",
});

PLASMIC.registerComponent(YAxis, {
  name: "Y Axis",
  props: {},
  importPath: "react-vis",
  importName: "YAxis",
});

PLASMIC.registerComponent(VerticalBarSeries, {
  name: "Bar Series",
  props: {
    data: "object",
    barWidth: "number",
  },
  importPath: "react-vis",
  importName: "VerticalBarSeries",
});

PLASMIC.registerComponent(GoogleMap, {
  name: "Map",
  props: {
    center: "object",
    zoom: "number",
  },
  importPath: "@react-google-maps/api",
  importName: "GoogleMap",
  classNameProp: "mapContainerClassName",
});

PLASMIC.registerComponent(DynWiredButton, {
  name: "WiredButton",
  props: {
    children: "string",
    elevation: "number",
    disabled: "boolean",
  },
  importPath: "./components/DynamicWired",
  importName: "DynWiredButton",
});

PLASMIC.registerComponent(DynWiredIconButton, {
  name: "WiredIconButton",
  props: {
    icon: "string",
    iconSize: "number",
    iconColor: "string",
    lineColor: "string",
    disabled: "boolean",
  },
  importPath: "./components/DynamicWired",
  importName: "DynWiredIconButton",
});

PLASMIC.registerComponent(ProductGallery, {
  name: "ProductGallery",
  props: {
    count: "number",
    scroller: "boolean",
    category: {
      type: "choice",
      options: ["", "Boots", "Shirts", "Knitwear"],
    },
  },
  importPath: "./components/ItemGallery",
});

PLASMIC.registerComponent(CmsGallery, {
  name: "CmsGallery",
  props: {
    count: "number",
    scroller: "boolean",
  },
  importPath: "./components/ItemGallery",
});

PLASMIC.registerComponent(ArwesCard, {
  name: "ArwesCard",
  props: {
    caption: "slot",
    children: "slot",
    title: "slot",
  },
  importPath: "./components/Arwes",
  importName: "ArwesCard",
});

PLASMIC.registerComponent(Text, {
  name: "ArwesText",
  props: {
    children: "slot",
    as: "string",
  },
  importPath: "@arwes/core",
  importName: "Text",
});

PLASMIC.registerComponent(Figure, {
  name: "ArwesFigure",
  props: {
    children: "slot",
    alt: "string",
    src: "string",
  },
  importPath: "@arwes/core",
  importName: "Figure",
});


//Ant Design


PLASMIC.registerComponent(Carousel, {
  name: "Carousel",
  props: {
    children: "slot",
  },
  importPath: "antd",
});


//Custom Blocks


PLASMIC.registerComponent(Embed, {
  name: "Embed",
  props: {
    code: "string",
  },
  importPath: "./components/Embed",
});


//Animation 


PLASMIC.registerComponent(Tilt, {
  name: "Tilt",
  props: {
    tiltEnable: "boolean",
    tiltReverse: "boolean",
    tiltAngleXInitial: "number",
    tiltAngleYInitial: "number",
    tiltMaxAngleX: "number",
    tiltMaxAngleY: "number",
    tiltAxis: "string",
    tiltAngleXManual: "number",
    tiltAngleYManual: "number",
    glareEnable: "boolean",
    glareMaxOpacity: "number",
    glareColor: "string",
    glareBorderRadius: "string",
    glarePosition: "string",
    scale: "number",
    perspective: "number",
    flipVertically: "boolean",
    flipHorizontally: "boolean",
    reset: "boolean",
    transitionEasing: "string",
    transitionSpeed: "number",
    trackOnWindow: "boolean",
    gyroscope: "boolean",
    children: "slot",
  },
  importPath: "./components/Tilt",
});

PLASMIC.registerComponent(ParallaxWrapper, {
  name: "Parallax",
  props: {
    x: "object",
    y: "object",
    disabled: "boolean",
    children: "slot",
  },
  importPath: "./components/ParallaxWrapper",
  importName: "ParallaxWrapper",
});

PLASMIC.registerComponent(Reveal, {
  name: "Reveal",
  props: {
    children: "slot",
    effect: {
      type: "choice",
      options: [
        "bounce",
        "fade",
        "flip",
        "hinge",
        "jackinthebox",
        "roll",
        "rotate",
        "slide",
        "zoom",
      ],
    },
    cascade: "boolean",
    damping: "boolean",
    direction: {
      type: "choice",
      options: ["up", "down", "left", "right"],
    },
    delay: "number",
    duration: "number",
    fraction: "number",
    triggerOnce: "boolean",
  },
  importPath: "./components/Reveal",
  importName: "Reveal",
});

