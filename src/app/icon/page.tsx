"use client";

import AddIcon from "@ui/assets/icons/add.svg";
import CheckIcon from "@ui/assets/icons/check.svg";
import DownloadIcon from "@ui/assets/icons/download.svg";
import EditIcon from "@ui/assets/icons/edit.svg";
import ErrorIcon from "@ui/assets/icons/error.svg";
import EyeIcon from "@ui/assets/icons/eye.svg";
import InfoIcon from "@ui/assets/icons/info.svg";
import TrashIcon from "@ui/assets/icons/trash.svg";

import CodeView from "@/components/CodeView";
import ComponentAccessibility from "@/components/ComponentAccessibility";
import ComponentApi from "@/components/ComponentApi";
import PageScroll from "@/components/PageScroll";
import Title from "@/components/Title";
import Button from "@/components/ui/button/Button";
import Icon from "@/components/ui/icon/Icon";
import iconApi from "@/documentation/icon.json";

export default function IconPage() {
    return (
        <PageScroll
            name={iconApi.name}
            link={iconApi.source}
        >
            <Title level={1}>Icon</Title>
            <p>
                The <code>Icon</code> component renders an SVG icon with a
                consistent size, color, and accessible behavior. Use the
                provided SVG assets as the <code>icon</code> prop.
            </p>

            <Title level={2}>Available icons</Title>
            <p>
                The library includes icons for common actions, statuses, and
                interface controls.
            </p>
            <CodeView
                code={`<Icon icon={InfoIcon} />
<Icon icon={CheckIcon} />
<Icon icon={DownloadIcon} />
<Icon icon={EditIcon} />
<Icon icon={EyeIcon} />
<Icon icon={TrashIcon} />`}
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    alignItems: "center",
                }}
            >
                <Icon icon={InfoIcon} />
                <Icon icon={CheckIcon} />
                <Icon icon={DownloadIcon} />
                <Icon icon={EditIcon} />
                <Icon icon={EyeIcon} />
                <Icon icon={TrashIcon} />
            </CodeView>

            <Title level={2}>Size and color</Title>
            <p>
                The default size is <code>18</code> pixels and the default color
                is <code>currentColor</code>. Customize them with{" "}
                <code>size</code> and <code>fill</code>.
            </p>
            <CodeView
                code={`<Icon icon={AddIcon} size={14} fill="currentColor" />
<Icon icon={AddIcon} size={24} fill="royalblue" />
<Icon icon={AddIcon} size={36} fill="seagreen" />`}
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                }}
            >
                <Icon
                    icon={AddIcon}
                    size={14}
                    fill="currentColor"
                />
                <Icon
                    icon={AddIcon}
                    size={24}
                    fill="royalblue"
                />
                <Icon
                    icon={AddIcon}
                    size={36}
                    fill="seagreen"
                />
            </CodeView>

            <Title level={2}>Accessible icons</Title>
            <p>
                Icons are decorative by default. When an icon communicates
                information by itself, provide an <code>aria-label</code>. This
                gives it an image role and an accessible name.
            </p>
            <CodeView
                code={`<Icon icon={ErrorIcon} fill="crimson" aria-label="Error" />
<Icon icon={InfoIcon} fill="royalblue" aria-label="Information" />`}
                style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "center",
                }}
            >
                <Icon
                    icon={ErrorIcon}
                    fill="crimson"
                    aria-label="Error"
                />
                <Icon
                    icon={InfoIcon}
                    fill="royalblue"
                    aria-label="Information"
                />
            </CodeView>

            <Title level={2}>Using icons in controls</Title>
            <p>
                An icon can be placed inside another component, such as a
                button. The control must provide the accessible name when the
                icon is decorative.
            </p>
            <CodeView
                code={`<button type="button" aria-label="Delete item">
    <Icon icon={TrashIcon} />
</button>
<button type="button" aria-label="Edit item">
    <Icon icon={EditIcon} />
</button>`}
                style={{
                    display: "flex",
                    gap: "1rem",
                }}
            >
                <Button aria-label="Delete item">
                    <Icon icon={TrashIcon} />
                </Button>
                <Button aria-label="Edit item">
                    <Icon icon={EditIcon} />
                </Button>
            </CodeView>

            <ComponentApi elements={iconApi} />
            <ComponentAccessibility elements={iconApi.accessibility} />
        </PageScroll>
    );
}
