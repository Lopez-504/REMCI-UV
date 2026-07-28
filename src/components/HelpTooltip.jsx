import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CircleQuestionMark, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";

import "./helpTooltip.css";

export default function HelpTooltip({
    helpKey,
    namespace = "help",
    placement = "bottom",
    size = 18,
    image = "",
    icon = "circleQM"
}) {

    const { t } = useTranslation(namespace);

    return (
        <OverlayTrigger
            placement={placement}
            delay={{ show: 100, hide: 300 }}
            container={document.body}
            overlay={
                <Tooltip id={`tooltip-${helpKey}`} className="dash-tooltip">
                    {t(helpKey)}
                    <img src={image} alt="" />
                </Tooltip>
            }
        >
            <span className="help-tooltip">
                {icon==='pallete' ? <Palette size={size}/> : <CircleQuestionMark size={size}/> }
                
            </span>
        </OverlayTrigger>
    );
}