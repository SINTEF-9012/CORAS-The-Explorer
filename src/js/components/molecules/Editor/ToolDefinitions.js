import joint from 'jointjs';

import {
    assetSymbol,
    assetSymbolOutlined,
    assetSymbolShaded,
    indirectAssetSymbol,
    indirectAssetSymbolOutlined,
    indirectAssetSymbolShaded,
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
const indirectHeight = 60;
const stakeholderHeight = 60;
const accidentalHeight = 40;
const deliberateHeight = 40;
const nonHumanHeight = 40;
const incidentHeight = 40;
const vulnerabilityHeight = 40;
const treatmentHeight = 40;

export default [
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
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: indirectHeight,
                icon: indirectAssetSymbol,
                text: "Indirect\nAsset",
                corasType: 0,
                typeStyles: {
                    0: { "icon/href": indirectAssetSymbol, "icon/height": indirectHeight },
                    1: { "icon/href": indirectAssetSymbolOutlined, "icon/height": indirectHeight },
                    2: { "icon/href": indirectAssetSymbolShaded, "icon/height": indirectHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: riskHeight,
                icon: riskSymbol,
                text: "Threat\nScenario",
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
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: assetHeight,
                icon: assetSymbol,
                text: "Asset",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": assetSymbol, "icon/height": assetHeight },
                    1: { "icon/href": assetSymbolOutlined, "icon/height": assetHeight },
                    2: { "icon/href": assetSymbolShaded, "icon/height": assetHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: indirectHeight,
                icon: indirectAssetSymbol,
                text: "Indirect\nAsset",
                corasType: 1,
                typeStyles: {
                    0: { "icon/href": indirectAssetSymbol, "icon/height": indirectHeight },
                    1: { "icon/href": indirectAssetSymbolOutlined, "icon/height": indirectHeight },
                    2: { "icon/href": indirectAssetSymbolShaded, "icon/height": indirectHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: riskHeight,
                icon: riskSymbol,
                text: "Threat\nScenario",
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
                iconHeight: stakeholderHeight,
                icon: stakeholderSymbol,
                text: "Stakeholder",
                corasType: 1,
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
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: assetHeight,
                icon: assetSymbol,
                text: "Asset",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": assetSymbol, "icon/height": assetHeight },
                    1: { "icon/href": assetSymbolOutlined, "icon/height": assetHeight },
                    2: { "icon/href": assetSymbolShaded, "icon/height": assetHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.unboxedElement(),
                width: 40,
                height: 80,
                iconHeight: indirectHeight,
                icon: indirectAssetSymbol,
                text: "Indirect\nAsset",
                corasType: 2,
                typeStyles: {
                    0: { "icon/href": indirectAssetSymbol, "icon/height": indirectHeight },
                    1: { "icon/href": indirectAssetSymbolOutlined, "icon/height": indirectHeight },
                    2: { "icon/href": indirectAssetSymbolShaded, "icon/height": indirectHeight }
                }
            },
            {
                shapeFn: () => new joint.shapes.coras.ellipseElement(),
                width: 190,
                height: 80,
                iconHeight: riskHeight,
                icon: riskSymbol,
                text: "Threat\nScenario",
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
                iconHeight: stakeholderHeight,
                icon: stakeholderSymbol,
                text: "Stakeholder",
                corasType: 2,
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
];
