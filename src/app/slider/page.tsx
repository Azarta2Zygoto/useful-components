import Slider from "@/components/ui/slider/Slider";

export default function SliderPage() {
    return (
        <main>
            <h1>Slider Page</h1>
            <p>
                This is a simple slider component. You can use it to select a
                value from a range.
            </p>
            <h2>Basic Slider</h2>
            <div className="inner-component">
                <Slider
                    label="Basic Slider"
                    min={0}
                    max={100}
                    defaultValue={50}
                />
            </div>
            <h2>Slider with Step</h2>
            <div className="inner-component">
                <Slider
                    label="Slider with Step"
                    min={0}
                    max={100}
                    step={10}
                    defaultValue={50}
                />
                <Slider
                    label="Slider with Step and tick"
                    min={0}
                    max={100}
                    step={10}
                    tick
                    defaultValue={50}
                />
            </div>
            <h2>Slider disabled</h2>
            <div className="inner-component">
                <Slider
                    label="Slider disabled"
                    min={0}
                    max={100}
                    defaultValue={50}
                    disabled
                />
            </div>
            <h2>Slider thumb tooltip</h2>
            <p>
                You can control when the thumb tooltip appears : always, hover
                or never
            </p>
            <div className="inner-component">
                <Slider
                    label="Slider thumb always"
                    min={0}
                    max={100}
                    defaultValue={50}
                    tooltipThumb="always"
                />
                <Slider
                    label="Slider thumb hover"
                    min={0}
                    max={100}
                    defaultValue={50}
                />
                <Slider
                    label="Slider thumb never"
                    min={0}
                    max={100}
                    defaultValue={50}
                    tooltipThumb="never"
                />
            </div>
        </main>
    );
}
