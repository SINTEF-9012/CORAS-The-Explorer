import React from 'react';
import joint from 'jointjs';
import { connect } from 'react-redux';
import {
    ElementRightClicked,
    ElementDoubleClicked,
    ElementEditorCancel,
    ElementEditorSave,
    ElementEditorDelete,
    ElementLabelEdit,
    ElementChangeX,
    ElementChangeY,
    ElementChangeType,
    ToolElementRelease,
    MenuClearClicked
} from '../../../store/Actions';

import Modal from '../../atoms/Modal/Modal';

import ElementEditor from './ElementEditor';
import EditorTool from './EditorTool';

import "../../../../../node_modules/jointjs/dist/joint.css";
import './editor.css';

import AddCorasShapes from './CORASShapes.js';

import {        CorasSymbolsBase64,
    assetSymbol,
    assetSymbolOutlined,
    assetSymbolShaded,
    convertToBase64,
    riskSymbol,
    riskSymbolOutlined,
    riskSymbolShaded,
    stakeholderSymbol,
    stakeholderSymbolOutlined,
    stakeholderSymbolShaded,
    threatHumanAccidentalSymbol,
    threatHumanAccidentalSymbolOutline,
    threatHumanAccidentalSymbolShadow,
    threatHumanDeliberateSymbol,
    threatHumanDeliberateSymbolOutlined,
    threatHumanDeliberateSymbolShaded,
    threatNonHumanSymbol,
    threatNonHumanSymbolOutlined,
    threatNonHumanSymbolShaded,
    treatmentSymbol,
    treatmentSymbolOutlined,
    treatmentSymbolShaded,
    unwantedIncidentSymbol,
    unwantedIncidentSymbolOutlined,
    unwantedIncidentSymbolShaded,
    vulnerabilitySymbol,
    vulnerabilitySymbolOutlined,
    vulnerabilitySymbolShaded,
} from "./svg//CorasSymbolsBase64.js"

const assetHeight = 60;
const riskHeight = 40;
const stakeholderHeight = 60;
const accidentalHeight = 40;
const deliberateHeight = 40;
const nonHumanHeight = 40;
const incidentHeight = 40;
const vulnerabilityHeight = 40;
const treatmentHeight = 40;
/*
//import assetSymbol from './svg/assetSymbol.svg';
const assetSymbol = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDEyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgNTE0NDgpICAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIiBbCgk8IUVOVElUWSBuc19zdmcgImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTwhRU5USVRZIG5zX3hsaW5rICJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KXT4KPHN2ZyAgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9IiZuc19zdmc7IiB4bWxuczp4bGluaz0iJm5zX3hsaW5rOyIgd2lkdGg9IjM1LjU0MyIgaGVpZ2h0PSI2MC4wODciCgkgdmlld0JveD0iMCAwIDM1LjU0MyA2MC4wODciIG92ZXJmbG93PSJ2aXNpYmxlIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAzNS41NDMgNDEuMDg3IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8cGF0aCBmaWxsPSIjQzI5MDU0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZD0iTTE1Ljg3Nyw0LjA1NGMwLDAsMC43NDQtMy4zOTIsMS43MzgtMy42MDQKCQkJYzAuOTkyLTAuMjEzLDEuMzQ2LDMuMTg5LDEuMzQ2LDMuMTg5czEuNzczLTEuODQzLDIuOTc3LTIuMTk3YzEuMjA1LTAuMzU0LDIuMTk5LTAuMDcsMS4yNzcsMC45OTMKCQkJYy0wLjkyMiwxLjA2Mi0yLjAxNCw0LjQ2LTEuOTg2LDYuMDk2YzAuMDcyLDMuODk4LDMuNzM0LDUuMTksNS45MzQsNi42NDdjNi42NDMsNC40MDIsNy45MjIsOC42NDQsNy45MjIsMTMuMzY1CgkJCWMwLDYuODgzLTYuNzIxLDEyLjA4Ni0xNy4yNTgsMTIuMDg2Yy0xMS43NjYsMC0xNy4zNjctNi4xNjItMTcuMzY3LTEyLjQ2M2MwLTUuNDU3LDIuOTgyLTkuNTI4LDcuMDk2LTExLjg2NwoJCQljNC40MzYtMi41MjUsNi42NTgtMy4zNzMsOC41LTQuNzkxYzEuODQyLTEuNDE3LTEuOTE0LTUuNDU5LTMuNDczLTYuNTIxYy0xLjI0NC0wLjg0OS0xLjIwNS0wLjk5My0zLjMzMi0xLjc3MgoJCQljMCwwLDEuNzc3LTEuNjMyLDMuNjE1LTEuMDYzYzIuMTkzLDAuNjc4LDQuMTExLDMuMjYxLDQuMTExLDMuMjYxIi8+CgkJPHBhdGggZD0iTTE1LjU5OSwzLjI4NWMtMC43MzEtMC42NDEtMS42MjctMS4yNzMtMi41OTctMS41NzNjLTIuMDY2LTAuNjM5LTMuOTgxLDEuMDktNC4wNjIsMS4xNjRsLTAuNTU2LDAuNTFsMC43MDgsMC4yNTkKCQkJYzEuNjY3LDAuNjExLDEuOTMsMC43OTksMi42MzIsMS4zbDAuNTk5LDAuNDJjMS4yNjksMC44NjUsMy43MjQsMy41MDYsMy43NjksNS4wNTNjMC4wMDksMC4zMjEtMC4wOTIsMC41NTItMC4zMTcsMC43MjUKCQkJYy0xLjA2MywwLjgxOS0yLjI5OSwxLjQ2My00LjAwOSwyLjM1NUw3LjMyOCwxNS45QzIuNjcxLDE4LjU0NywwLDIzLjAxOCwwLDI4LjE2NmMwLDYuNDMyLDUuNTEyLDEyLjkyMiwxNy44MjcsMTIuOTIyCgkJCWMxMC40MzIsMCwxNy43MTctNS4xNTgsMTcuNzE3LTEyLjU0NWMwLTQuMzQzLTAuOTg0LTkuMDE0LTguMTI3LTEzLjc0OGwtMS4zMDctMC43OTJjLTIuMDQ3LTEuMTg4LTQuMzY3LTIuNTM1LTQuNDIyLTUuNDgxCgkJCWMtMC4wMjUtMS41MjksMS4wNDMtNC44MjgsMS44NzQtNS43ODZjMC42MDUtMC42OTgsMC41MjItMS4xNywwLjM0Ny0xLjQ0M2MtMC4zMDctMC40NzktMS4wOTItMC41ODctMi4xLTAuMjkyCgkJCWMtMC44NTYsMC4yNTItMS44NjYsMS4wOTItMi41MjIsMS42OTVjLTAuMTU3LTAuOTA1LTAuNDYzLTIuMTEtMS4wNDgtMi41MzVMMTcuNTE5LDBDMTYuNTQ2LDAuMjA4LDE1LjkyMywyLjAzNiwxNS41OTksMy4yODV6CgkJCSBNMTcuNzExLDAuODk4YzAuMjU4LDAuMTE4LDAuNjU2LDEuNDc0LDAuNzkzLDIuNzg4bDAuMTAzLDAuOTgybDAuNjg2LTAuNzExYzAuNDctMC40ODksMS44ODYtMS44MTMsMi43NzUtMi4wNzYKCQkJYzAuNjEyLTAuMTgsMC45NjItMC4xMjQsMS4wNTMtMC4wNzdjLTAuMDI5LDAuMDIxLTAuMDc3LDAuMTI2LTAuMjUyLDAuMzI5Yy0wLjk3OSwxLjEyNy0yLjEsNC41MjQtMi4xLDYuMzM0CgkJCWMwLDAuMDI0LDAsMC4wNDcsMC4wMDEsMC4wN2MwLjA2MywzLjQ2NSwyLjczMyw1LjAxNSw0Ljg3OSw2LjI2bDEuMjYsMC43NjNjNi40MDQsNC4yNDQsNy43MTcsOC4yNTksNy43MTcsMTIuOTgyCgkJCWMwLDYuODQ2LTYuOTA4LDExLjYyNy0xNi43OTksMTEuNjI3Yy0xMS42OCwwLTE2LjkwOC02LjAyOS0xNi45MDgtMTIuMDA0YzAtNC44NzgsMi40MzgtOC45NTEsNi44NjMtMTEuNDY3bDQuNDA4LTIuMzg1CgkJCWMxLjc1Mi0wLjkxNCwzLjAxNy0xLjU3NCw0LjE0NS0yLjQ0MmMwLjQ0My0wLjM0MSwwLjY3Ni0wLjgyOSwwLjY3Ni0xLjQxNWMwLTAuMDIxLDAtMC4wNDMtMC4wMDEtMC4wNjQKCQkJYy0wLjA2MS0yLjEwOS0zLjAwNy00Ljk5My00LjE2OS01Ljc4NWwtMC41ODMtMC40MDljLTAuNTk4LTAuNDI3LTAuOTc1LTAuNjc3LTIuMDUtMS4xMDZjMC42MS0wLjM3NiwxLjU2Mi0wLjc5OSwyLjUyMS0wLjUwMgoJCQljMi4wMjEsMC42MjUsMy44NiwzLjA3MSwzLjg3OCwzLjA5NmwwLjczNy0wLjU0OGMtMC4wMzQtMC4wNDYtMC40MDYtMC41MzItMC45ODItMS4xMjdDMTYuNzI4LDIuNDQsMTcuMzU0LDAuOTc1LDE3LjcxMSwwLjg5OHoiCgkJCS8+Cgk8L2c+Cgk8Zz4KCQk8cGF0aCBmaWxsPSIjRkVFODRDIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3ICAgICIgZD0iTTIyLjczNyw2LjUxYy0wLjAzNS0wLjMxOS0wLjIxMy0wLjc5Ny0xLjc1NC0wLjU2NwoJCQljLTEuODM2LDAuMjc0LTUuNTcyLDEuMTY0LTYuMzk4LDEuNTc3Yy0wLjc0NCwwLjM3My0xLjAxLDAuNzk5LTAuNzI3LDEuMjIzYzAuMjgzLDAuNDI2LDEuNDE4LDAuNDk3LDEuNDE4LDAuNDk3CgkJCXMtMS4wNjIsMC41MzEtMC44NjksMS4wNDZjMC4yMjEsMC41ODEsMS4wMzUsMC41ODEsMi45OTYsMC4xNTlDMTguNTQ1LDEwLjE5OCwyMSw5LjY2NSwyMi4wODEsOS4zMQoJCQljMS4wODItMC4zNTQsMS4yMjctMS4wOTcsMS4xNy0xLjM2NGMtMC4wOTYtMC40NjMtMS4xNy0wLjUzMi0xLjE3LTAuNTMyUzIyLjc3Miw2LjgyOCwyMi43MzcsNi41MXoiLz4KCQk8cGF0aCBkPSJNMjAuOTE2LDUuNDg4Yy0xLjcyNywwLjI1OC01LjYwNywxLjE1Ni02LjUzNywxLjYyMWMtMC42MDUsMC4zMDQtMC45NTIsMC42NDctMS4wNTksMS4wNTFsMC4xNTYsMC44MzgKCQkJYzAuMTYsMC4yNCwwLjQ0OCwwLjM4NiwwLjc0NSwwLjQ5Yy0wLjE2NSwwLjE5My0wLjMsMC40MDktMC4zLDAuNjYyYzAsMC4wOTYsMC4wMTcsMC4xOTQsMC4wNTUsMC4yOTcKCQkJYzAuMzkyLDEuMDMyLDEuNzY3LDAuODI0LDMuNTIzLDAuNDQ3YzEuNTM4LTAuMzMyLDMuNzAxLTAuODExLDQuNzI1LTEuMTQ3YzEuMTI0LTAuMzY4LDEuNDk2LTEuMTU5LDEuNDk2LTEuNjkyCgkJCWMwLTAuMDczLTAuMDA3LTAuMTQyLTAuMDIxLTAuMjA0Yy0wLjA3OC0wLjM3OS0wLjQtMC41OTYtMC43NDMtMC43MjRjMC4xMzMtMC4xOTQsMC4yNDEtMC4zOTYsMC4yNDEtMC41OTYKCQkJYzAtMC4wMjQtMC4wMDItMC4wNDgtMC4wMDQtMC4wNzFsLTAuMzk4LTAuNzQ0QzIyLjQxOSw1LjQyNSwyMS44MjIsNS4zNTMsMjAuOTE2LDUuNDg4eiBNMTQuODM2LDEwLjEyMgoJCQljMC4wMzUtMC4wNjcsMC4zNTItMC4zMjQsMC42NDYtMC40NzJsMS41MDQtMC43NTlsLTEuNjgxLTAuMTFjLTAuNDUtMC4wMjktMC45NzgtMC4xNzUtMS4wNjUtMC4yOTMKCQkJYy0wLjAyNi0wLjExMywwLjAzNi0wLjI5OSwwLjU1MS0wLjU1N2MwLjcxNy0wLjM1OCw0LjM0NS0xLjI0Nyw2LjI2MS0xLjUzNGMwLjg5Ni0wLjEzMywxLjE0NCwwLjAxNSwxLjE4NCwwLjA0NgoJCQljMCwwLDAuMDE3LDAuMDQyLDAuMDMsMC4wNzdjLTAuMDUsMC4xMTItMC4yNjgsMC4zNjEtMC40ODEsMC41NDJsLTAuODYxLDAuNzMybDEuMTI4LDAuMDc3YzAuMzEzLDAuMDIxLDAuNjk1LDAuMTI2LDAuNzcsMC4yMTIKCQkJYy0wLjAwMiwwLjA2NS0wLjA5OSwwLjUzMy0wLjg4MiwwLjc4OWMtMS4wOTcsMC4zNjEtMy43NTgsMC45MzQtNC42MzIsMS4xMjJDMTYuNzMsMTAuMTE5LDE0Ljk3OCwxMC40OTYsMTQuODM2LDEwLjEyMnoKCQkJIE0yMy4xOTQsNi40NTlsLTAuMDEtMC4wODhMMjMuMTk0LDYuNDU5eiBNMjMuMTk0LDYuNDU5TDIzLjE5NCw2LjQ1OUwyMy4xOTQsNi40NTlMMjMuMTk0LDYuNDU5eiIvPgoJPC9nPgoJPGc+CgkJPHJlY3QgeD0iMTguMTEzIiB5PSI0LjcwNiIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuMjQ1NSAtMC45Njk0IDAuOTY5NCAtMC4yNDU1IDE1LjA0MzMgMjguMzk2NSkiIHdpZHRoPSIwLjkxOSIgaGVpZ2h0PSI3LjI3NyIvPgoJPC9nPgoJPGc+CgkJPHBhdGggZD0iTTE3LjY1MSwzNi45NnYtMi4wMjdjLTEuMDEtMC4xMjctMS44MjYtMC4zNTItMi40NTctMC42NzRjLTAuNjMxLTAuMzI0LTEuMTc2LTAuODQ2LTEuNjM1LTEuNTcKCQkJYy0wLjQ1Ny0wLjcyMS0wLjcyNS0xLjYwNC0wLjc5OS0yLjY0NWwyLjAyNy0wLjM4N2MwLjE1NiwxLjA4LDAuNDMyLDEuODc1LDAuODI4LDIuMzgxYzAuNTY2LDAuNzE3LDEuMjQ0LDEuMTEzLDIuMDM1LDEuMTk1CgkJCXYtNi4zMjJjLTAuODIyLTAuMjE1LTEuNjY4LTAuNTY0LTIuNTMxLTEuMDQ5Yy0wLjY0MS0wLjM1Ny0xLjEzNy0wLjg1Mi0xLjQ4LTEuNDg0Yy0wLjM0OC0wLjYzNS0wLjUyMS0xLjM1NS0wLjUyMS0yLjE2MgoJCQljMC0xLjQzLDAuNTA2LTIuNTksMS41Mi0zLjQ3OGMwLjY3Ni0wLjU5NywxLjY4LTAuOTYyLDMuMDE0LTEuMDk3di0wLjk1M2gxLjE5MXYwLjk1M2MxLjE2NCwwLjExNCwyLjA4OCwwLjQ1OCwyLjc3MywxLjAzNAoJCQljMC44NzMsMC43MzQsMS40LDEuNzQxLDEuNTc4LDMuMDIxbC0yLjA1NywwLjMyOGMtMC4xMTktMC43OTktMC4zNjUtMS40MTItMC43NDQtMS44MzhjLTAuMzc3LTAuNDI4LTAuODk1LTAuNzA4LTEuNTUxLTAuODQ1CgkJCXY1Ljc4OWMxLjAxNCwwLjI2NiwxLjY4NCwwLjQ2OSwyLjAxLDAuNjExYzAuNjI3LDAuMjc1LDEuMTM3LDAuNjExLDEuNTMxLDEuMDA2czAuNjk5LDAuODYzLDAuOTEsMS40MDYKCQkJYzAuMjEzLDAuNTQ1LDAuMzE4LDEuMTMzLDAuMzE4LDEuNzY2YzAsMS4zOTUtMC40NDMsMi41NTctMS4zMjgsMy40ODZjLTAuODg3LDAuOTMyLTIuMDM1LDEuNDMyLTMuNDQxLDEuNDk4djIuMDU3SDE3LjY1MXoKCQkJIE0xNy42NTEsMTkuMzEyYy0wLjc3NywwLjExOS0xLjM4OSwwLjQzMy0xLjgzNCwwLjkzOGMtMC40NDcsMC41MDgtMC42NzIsMS4xMDktMC42NzIsMS44MDJjMCwwLjY4NiwwLjE5MSwxLjI2LDAuNTcsMS43MjMKCQkJYzAuMzc5LDAuNDYxLDEuMDIzLDAuODA5LDEuOTM2LDEuMDQ1VjE5LjMxMnogTTE4Ljg0MiwzMy4yMzRjMC43ODMtMC4wOTgsMS40MzItMC40MzQsMS45NDUtMS4wMTYKCQkJYzAuNTEyLTAuNTgsMC43NjgtMS4yOTcsMC43NjgtMi4xNTJjMC0wLjczLTAuMTgyLTEuMzE0LTAuNTQ5LTEuNzU4Yy0wLjM2NS0wLjQ0MS0xLjA4Ni0wLjgwMy0yLjE2NC0xLjA4NFYzMy4yMzR6Ii8+Cgk8L2c+CjwvZz4KPC9zdmc+Cg==";
import assetSymbolOutlined from './svg/assetSymbolOutlined.svg';
import assetSymbolShaded from './svg/assetSymbolShaded.svg';

import riskSymbol from './svg/riskSymbol.svg';
import riskSymbolOutlined from './svg/riskSymbolOutlined.svg';
import riskSymbolShaded from './svg/riskSymbolShaded.svg';

import stakeholderSymbol from './svg/stakeholderSymbol.svg';
import stakeholderSymbolOutlined from './svg/stakeholderSymbolOutlined.svg';
import stakeholderSymbolShaded from './svg/stakeholderSymbolShaded.svg';

import accidentalSymbol from './svg/threatHumanAccidentalSymbol.svg';
import accidentalSymbolOutlined from './svg/threatHumanAccidentalSymbolOutline.svg';
import accidentalSymbolShaded from './svg/threatHumanAccidentalSymbolShadow.svg';

import deliberateSymbol from './svg/threatHumanDeliberateSymbol.svg';
import deliberateSymbolOutlined from './svg/threatHumanDeliberateSymbolOutlined.svg';
import deliberateSymbolShaded from './svg/threatHumanDeliberateSymbolShaded.svg';

import nonHumanSymbol from './svg/threatNonHumanSymbol.svg';
import nonHumanSymbolOutlined from './svg/threatNonHumanSymbolOutlined.svg';
import nonHumanSymbolShaded from './svg/threatNonHumanSymbolShaded.svg';

import treatmentSymbol from './svg/treatmentSymbol.svg';
import treatmentSymbolShaded from './svg/treatmentSymbolShaded.svg';
import treatmentSymbolOutlined from './svg/treatmentSymbolOutlined.svg';

import incidentSymbol from './svg/unwantedIncidentSymbol.svg';
import incidentSymbolOutlined from './svg/unwantedIncidentSymbolOutlined.svg';
import incidentSymbolShaded from './svg/unwantedIncidentSymbolShaded.svg';

import vulnerabilitySymbol from './svg/vulnerabilitySymbol.svg';
import vulnerabilitySymbolOutlined from './svg/vulnerabilitySymbolOutlined.svg';
import vulnerabilitySymbolShaded from './svg/vulnerabilitySymbolShaded.svg';*/


const toolDefinitions = [
    {
        name: "Basic CORAS",
        shapes: [
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: assetHeight,
                icon: assetSymbol,
                text: "Asset",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": assetSymbol, "icon/height": assetHeight },
                    1: { "icon/href": assetSymbolOutlined, "icon/height": assetHeight },
                    2: { "icon/href": assetSymbolShaded, "icon/height": assetHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: riskHeight,
                icon: riskSymbol,
                text: "Risk",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": riskSymbol, "icon/height": riskHeight },
                    1: { "icon/href": riskSymbolOutlined, "icon/height": riskHeight },
                    2: { "icon/href": riskSymbolShaded, "icon/height": riskHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: stakeholderHeight,
                icon: stakeholderSymbol,
                text: "Stakeholder",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": stakeholderSymbol, "icon/height": stakeholderHeight},
                    1: { "icon/href": stakeholderSymbolOutlined, "icon/height": stakeholderHeight},
                    2: { "icon/href": stakeholderSymbolShaded, "icon/height": stakeholderHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: accidentalHeight,
                icon: threatHumanAccidentalSymbol,
                text: "Human Threat\nAccidental",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": threatHumanAccidentalSymbol, "icon/height": accidentalHeight },
                    1: { "icon/href":threatHumanAccidentalSymbolOutline, "icon/height": accidentalHeight },
                    2: { "icon/href": threatHumanAccidentalSymbolShadow, "icon/height": accidentalHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 100,
                iconHeight: deliberateHeight,
                icon: threatHumanDeliberateSymbol,
                text: "Human Threat\nDeliberate",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": threatHumanDeliberateSymbol, "icon/height": deliberateHeight },
                    1: { "icon/href": threatHumanDeliberateSymbolOutlined, "icon/height": deliberateHeight },
                    2: { "icon/href": threatHumanDeliberateSymbolShaded, "icon/height": deliberateHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: nonHumanHeight,
                icon: threatNonHumanSymbol,
                text: "Non-Human\nThreat",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": threatNonHumanSymbol, "icon/height": nonHumanHeight },
                    1: { "icon/href": threatNonHumanSymbolOutlined, "icon/height": nonHumanHeight },
                    2: { "icon/href": threatNonHumanSymbolShaded, "icon/height": nonHumanHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: treatmentHeight,
                icon: treatmentSymbol,
                text: "Treatment",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": treatmentSymbol, "body/strokeDasharray": "", "icon/height": treatmentHeight },
                    1: { "icon/href": treatmentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight },
                    2: { "icon/href": treatmentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.rectElement(),
                width: 190,
                height: 80,
                iconHeight: incidentHeight,
                icon: unwantedIncidentSymbol,
                text: "Incident",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": unwantedIncidentSymbol, "body/strokeDasharray": "", "icon/height": incidentHeight },
                    1: { "icon/href": unwantedIncidentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight },
                    2: { "icon/href": unwantedIncidentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: vulnerabilityHeight,
                icon: vulnerabilitySymbol,
                text: "Vulnerability",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": vulnerabilitySymbol, "icon/height": vulnerabilityHeight },
                    1: { "icon/href": vulnerabilitySymbolOutlined, "icon/height": vulnerabilityHeight },
                    2: { "icon/href": vulnerabilitySymbolShaded, "icon/height": vulnerabilityHeight }
                }
            }
        ]
    },
    {
        name: "Before",
        shapes: [
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: riskHeight,
                icon: riskSymbol,
                text: "Risk",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": riskSymbol, "icon/height": riskHeight },
                    1: { "icon/href": riskSymbolOutlined, "icon/height": riskHeight },
                    2: { "icon/href": riskSymbolShaded, "icon/height": riskHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: accidentalHeight,
                icon: threatHumanAccidentalSymbol,
                text: "Human Threat\nAccidental",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": threatHumanAccidentalSymbol, "icon/height": accidentalHeight },
                    1: { "icon/href":threatHumanAccidentalSymbolOutline, "icon/height": accidentalHeight },
                    2: { "icon/href": threatHumanAccidentalSymbolShadow, "icon/height": accidentalHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 100,
                iconHeight: deliberateHeight,
                icon: threatHumanDeliberateSymbol,
                text: "Human Threat\nDeliberate",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": threatHumanDeliberateSymbol, "icon/height": deliberateHeight },
                    1: { "icon/href": threatHumanDeliberateSymbolOutlined, "icon/height": deliberateHeight },
                    2: { "icon/href": threatHumanDeliberateSymbolShaded, "icon/height": deliberateHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: nonHumanHeight,
                icon: threatNonHumanSymbol,
                text: "Non-Human\nThreat",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": threatNonHumanSymbol, "icon/height": nonHumanHeight },
                    1: { "icon/href": threatNonHumanSymbolOutlined, "icon/height": nonHumanHeight },
                    2: { "icon/href": threatNonHumanSymbolShaded, "icon/height": nonHumanHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: treatmentHeight,
                icon: treatmentSymbol,
                text: "Treatment",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": treatmentSymbol, "body/strokeDasharray": "", "icon/height": treatmentHeight },
                    1: { "icon/href": treatmentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight },
                    2: { "icon/href": treatmentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.rectElement(),
                width: 190,
                height: 80,
                iconHeight: incidentHeight,
                icon: unwantedIncidentSymbol,
                text: "Incident",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": unwantedIncidentSymbol, "body/strokeDasharray": "", "icon/height": incidentHeight },
                    1: { "icon/href": unwantedIncidentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight },
                    2: { "icon/href": unwantedIncidentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: vulnerabilityHeight,
                icon: vulnerabilitySymbol,
                text: "Vulnerability",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": vulnerabilitySymbol, "icon/height": vulnerabilityHeight },
                    1: { "icon/href": vulnerabilitySymbolOutlined, "icon/height": vulnerabilityHeight },
                    2: { "icon/href": vulnerabilitySymbolShaded, "icon/height": vulnerabilityHeight }
                }
            }
        ]
    },
    {
        name: "After",
        shapes: [
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: riskHeight,
                icon: riskSymbol,
                text: "Risk",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": riskSymbol, "icon/height": riskHeight },
                    1: { "icon/href": riskSymbolOutlined, "icon/height": riskHeight },
                    2: { "icon/href": riskSymbolShaded, "icon/height": riskHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: accidentalHeight,
                icon: threatHumanAccidentalSymbol,
                text: "Human Threat\nAccidental",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": threatHumanAccidentalSymbol, "icon/height": accidentalHeight },
                    1: { "icon/href":threatHumanAccidentalSymbolOutline, "icon/height": accidentalHeight },
                    2: { "icon/href": threatHumanAccidentalSymbolShadow, "icon/height": accidentalHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 100,
                iconHeight: deliberateHeight,
                icon: threatHumanDeliberateSymbol,
                text: "Human Threat\nDeliberate",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": threatHumanDeliberateSymbol, "icon/height": deliberateHeight },
                    1: { "icon/href": threatHumanDeliberateSymbolOutlined, "icon/height": deliberateHeight },
                    2: { "icon/href": threatHumanDeliberateSymbolShaded, "icon/height": deliberateHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: nonHumanHeight,
                icon: threatNonHumanSymbol,
                text: "Non-Human\nThreat",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": threatNonHumanSymbol, "icon/height": nonHumanHeight },
                    1: { "icon/href": threatNonHumanSymbolOutlined, "icon/height": nonHumanHeight },
                    2: { "icon/href": threatNonHumanSymbolShaded, "icon/height": nonHumanHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: treatmentHeight,
                icon: treatmentSymbol,
                text: "Treatment",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": treatmentSymbol, "body/strokeDasharray": "", "icon/height": treatmentHeight },
                    1: { "icon/href": treatmentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight },
                    2: { "icon/href": treatmentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": treatmentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.rectElement(),
                width: 190,
                height: 80,
                iconHeight: incidentHeight,
                icon: unwantedIncidentSymbol,
                text: "Incident",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": unwantedIncidentSymbol, "body/strokeDasharray": "", "icon/height": incidentHeight },
                    1: { "icon/href": unwantedIncidentSymbolOutlined, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight },
                    2: { "icon/href": unwantedIncidentSymbolShaded, "body/strokeDasharray": "8, 4", "icon/height": incidentHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: vulnerabilityHeight,
                icon: vulnerabilitySymbol,
                text: "Vulnerability",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": vulnerabilitySymbol, "icon/height": vulnerabilityHeight },
                    1: { "icon/href": vulnerabilitySymbolOutlined, "icon/height": vulnerabilityHeight },
                    2: { "icon/href": vulnerabilitySymbolShaded, "icon/height": vulnerabilityHeight }
                }
            }
        ]
    }
]

AddCorasShapes(joint);

class EditorView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div></div>);
    }
}

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.graph = new joint.dia.Graph();

        this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
        this.getFromLocalStorage = this.getFromLocalStorage.bind(this);

        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollBlank = this.handleScrollBlank.bind(this);
        this.beginMovePaper = this.beginMovePaper.bind(this);
        this.movePaper = this.movePaper.bind(this);
        this.endMovePaper = this.endMovePaper.bind(this);
        this.updatePaperSize = this.updatePaperSize.bind(this);
        this.removeLink = this.removeLink.bind(this);

        this.paperOnMouseUp = this.paperOnMouseUp.bind(this);

        this.saveGraphToFile = this.saveGraphToFile.bind(this);
        this.loadGraphFromFile = this.loadGraphFromFile.bind(this);
        this.clearGraph = this.clearGraph.bind(this);
        this.downloadSvg = this.downloadSvg.bind(this);

        this.paperId = this.props.paperId || 'paper-holder';
        this.paperWrapperId = `${this.paperId}-wrapper`;

        this.loadRef = React.createRef();
        this.paperRef = React.createRef();
    }

    saveToLocalStorage() {
        window.localStorage.setItem(this.paperId + "graph", JSON.stringify(this.graph.toJSON()))
    }

    getFromLocalStorage() {
        return window.localStorage.getItem(this.paperId + "graph");
    }

    componentDidMount() {
        this.paper = new joint.dia.Paper({
            el: document.getElementById(this.paperId),
            model: this.graph,
            width: document.getElementById(this.paperWrapperId).offsetWidth - 10,
            height: document.getElementById(this.paperWrapperId).offsetHeight - 10,
            gridSize: 1,
            background: {
                color: 'rgba(255, 255, 255, 1)',
            },
            interactive: this.props.interactive === undefined ? true : this.props.interactive
        });

        // Load graph from localStorage or props
        if (this.getFromLocalStorage()) this.graph.fromJSON(JSON.parse(this.getFromLocalStorage()));
        else if (this.props.initialDiagram) this.graph.fromJSON(this.props.initialDiagram);

        // Save in localStorage on change
        this.periodicalSave = setInterval(this.saveToLocalStorage, 1000);

        window.addEventListener('resize', this.updatePaperSize);

        if (this.props.interactive === undefined ? true : this.props.interactive) {
            this.paper.on('element:contextmenu', (elementView, e, x, y) => this.props.elementRightClicked(elementView.model, this.graph));
            this.paper.on('link:contextmenu', this.removeLink);
            this.paper.on('cell:pointerdblclick', (elementView, e, x, y) => this.props.elementDoubleClicked(elementView.model, e));

            this.paper.on('cell:mousewheel', this.handleScroll);
            this.paper.on('blank:mousewheel', this.handleScrollBlank);

            this.paper.on('blank:pointerdown', this.beginMovePaper);
            this.paper.on('blank:pointermove', this.movePaper);
            this.paper.on('blank:pointerup', this.endMovePaper);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updatePaperSize);
        clearInterval(this.periodicalSave);
    }

    handleScroll(cellView, e, x, y, delta) {
        const scaleFactor = 1.1;
        const currentScale = this.paper.scale();

        if (delta > 0) {
            const newX = currentScale.sx * scaleFactor > 5 ? currentScale.sx : currentScale.sx * scaleFactor;
            const newY = currentScale.sy * scaleFactor > 5 ? currentScale.sy : currentScale.sy * scaleFactor;
            this.paper.scale(newX, newY);
        } else if (delta < 0) {
            const newX = currentScale.sx / scaleFactor < 0.52 ? currentScale.sx : currentScale.sx / scaleFactor;
            const newY = currentScale.sy / scaleFactor < 0.52 ? currentScale.sy : currentScale.sy / scaleFactor;
            this.paper.scale(newX, newY);
        }
    }

    handleScrollBlank(e, x, y, delta) {
        this.handleScroll(null, e, x, y, delta);
    }

    beginMovePaper(e, x, y) {
        this.setState({ paperMove: { moving: true, x, y } });
    }

    movePaper(e, x, y) {
        if (this.state.paperMove.moving) {
            const { tx, ty } = this.paper.translate();
            this.paper.translate(tx + (x - this.state.paperMove.x), ty + (y - this.state.paperMove.y));
        }
    }

    endMovePaper(e, x, y) {
        this.setState({ paperMove: { moving: false } })
    }

    updatePaperSize() {
        this.paper.setDimensions(
            document.getElementById(this.paperWrapperId).offsetWidth - 10,
            document.getElementById(this.paperWrapperId).offsetHeight - 10);
    }

    removeLink(elementView, e, x, y) {
        if (!this.state.linkToRemove) this.setState({ linkToRemove: elementView });
        else if (this.state.linkToRemove === elementView) {
            this.setState({ linkToRemove: null });
            elementView.model.remove();
        } else this.setState({ linkToRemove: null });
    }

    paperOnMouseUp(e) {
        e.preventDefault();
        const localPoint = this.paper.pageToLocalPoint(e.pageX, e.pageY);
        this.props.elementDropped(this.graph, localPoint.x, localPoint.y);
    }

    saveGraphToFile(e) {
        e.preventDefault();
        const a = document.createElement('a');
        const graphContent = new Blob([JSON.stringify(this.graph.toJSON(), null, 2)], { type: 'text/plain' });
        a.href = URL.createObjectURL(graphContent);
        a.download = "CORASDiagram.json";
        a.click();
        a.remove();
    }

    loadGraphFromFile(e) {
        const filePath = e.target;
        const reader = new FileReader();
        if (filePath.files && filePath.files[0]) {
            reader.addEventListener('load', (e) => this.graph.fromJSON(JSON.parse(e.target.result)), { once: true });
            reader.readAsText(filePath.files[0]);
            filePath.value = "";
        }
    }

    clearGraph(e) {
        this.graph.clear();
        window.localStorage.removeItem(this.paperId + "graph");
        if (this.props.initialDiagram) this.graph.fromJSON(this.props.initialDiagram);
    }

    downloadSvg() {
        let svgElement = this.paperRef.current.getElementsByTagName('svg')[0];
        //get svg source.
        let serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgElement);

        //add name spaces.
        if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        // Fix svg size
        let search = /(<svg xmlns="\S*" xmlns:xlink="\S*" version="\S*" id="\S*" width=)\S*( height=)\S*(>)/gm;
        let replace = `$1"${this.paperRef.current.offsetWidth}px"$2"${this.paperRef.current.offsetHeight}px"$3`
        source = source.replace(search, replace);

        //add xml declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

        //convert svg source to URI data scheme.
        let url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

        let a = document.createElement('a');
        a.href = url;
        a.download = 'CORASDiagram.svg';
        a.click();
        a.remove();
    }

    render() {
        return (
            <div className="editor-wrapper">
                <EditorMenu
                    loadStartFn={() => this.loadRef.current.click()}
                    loadFn={this.loadGraphFromFile}
                    loadRef={this.loadRef}
                    saveFn={this.saveGraphToFile}
                    clearFn={this.clearGraph}
                    showClearModal={this.props.showClearModal}
                    clearPosition={this.props.clearPosition}
                    clearClicked={this.props.clearClicked}
                    downloadFn={this.downloadSvg} />
                {this.props.elementEditor.visible ? <ElementEditor
                    {...this.props.elementEditor.data}
                    cancel={this.props.elementEditorCancel}
                    save={this.props.elementEditorSave}
                    delete={this.props.elementEditorDelete}
                    labelOnChange={this.props.elementEditorLabelEdit}
                    xOnChange={this.props.elementEditorChangeX}
                    yOnChange={this.props.elementEditorChangeY}
                    typeOnChange={this.props.elementEditorChangeType} /> : null}
                <div
                    id={this.paperWrapperId}
                    className="editor-paper"
                    onDragEnter={(e) => e.preventDefault()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={this.paperOnMouseUp}
                    style={{ width: `${this.props.width}px`, height: `${this.props.height}px` }}
                    ref={this.paperRef} >
                    <div id={this.paperId}></div>
                </div>
                {this.props.interactive || this.props.interactive === undefined ?
                    <EditorTool toolDefinitions={toolDefinitions} /> : null}
            </div>);
    }
}



const EditorMenu = ({ loadStartFn, loadRef, loadFn, saveFn, clearFn, showClearModal, clearClicked, clearPosition, downloadFn }) =>
    <div className="editor-menu">
        <button className="editor-menu__button" onClick={loadStartFn}>Load</button>
        <input type="file" name="loadFile" label="Load" className="editor-menu__hidden" onChange={loadFn} ref={loadRef} />
        <button className="editor-menu__button" onClick={saveFn}>Save</button>
        <button className="editor-menu__button" onClick={clearClicked}>Clear</button>
        <Modal isOpen={showClearModal} noBackground={true} position={clearPosition}>
            Are you sure you want to clear the diagram?
            <button onClick={clearFn}>Clear</button><button onClick={clearClicked}>Cancel</button>
        </Modal>
        <button className="editor-menu__button" onClick={downloadFn}>Download (SVG)</button>
    </div>;



export default connect((state) => ({
    elementEditor: state.editor.elementEditor,
    showClearModal: state.editor.editorMenu.showClearModal,
    clearPosition: state.editor.editorMenu.clearPosition
}), (dispatch) => ({
    elementRightClicked: (element, graph) => dispatch(ElementRightClicked(element, graph)),
    elementDoubleClicked: (element, event) => dispatch(ElementDoubleClicked(element, event)),
    elementEditorCancel: () => dispatch(ElementEditorCancel()),
    elementEditorSave: () => dispatch(ElementEditorSave()),
    elementEditorDelete: () => dispatch(ElementEditorDelete()),
    elementEditorLabelEdit: (label) => dispatch(ElementLabelEdit(label)),
    elementEditorChangeX: (x) => dispatch(ElementChangeX(x)),
    elementEditorChangeY: (y) => dispatch(ElementChangeY(y)),
    elementEditorChangeType: (type) => dispatch(ElementChangeType(type)),
    elementDropped: (graph, pageX, pageY) => dispatch(ToolElementRelease(graph, pageX, pageY)),
    clearClicked: (e) => dispatch(MenuClearClicked(e))
}))(Editor);
