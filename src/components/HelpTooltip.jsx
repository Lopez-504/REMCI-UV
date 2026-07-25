import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { CircleQuestionMark } from "lucide-react";
import { useTranslation } from "react-i18next";

import "./helpTooltip.css";

export default function HelpTooltip({
    helpKey,
    namespace = "help",
    placement = "bottom",
    size = 18,
}) {

    const { t } = useTranslation(namespace);

    return (
        <OverlayTrigger
            placement={placement}
            delay={{ show: 100, hide: 300 }}
            overlay={
                <Tooltip id={`tooltip-${helpKey}`} className="dash-tooltip">
                    {t(helpKey)}
                </Tooltip>
            }
        >
            <span className="help-tooltip">
                <CircleQuestionMark size={size} />
            </span>
        </OverlayTrigger>
    );
}