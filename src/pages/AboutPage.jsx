import "../css/about.css"

export default function AboutPage() {
    return (
        <>
            <h2 className="my-title">Myself</h2>
            <div className="my-container">
                <ul className="my-list">
                    <h3 id="h-info">Education</h3>
                    <li>Senior Secondary Education &nbsp;-&nbsp; (2020 &nbsp;-&nbsp; 2022)</li>
                    <li>Bachelors in Mass Media(BMM) &nbsp;-&nbsp; (2022 &nbsp;-&nbsp; 2024)</li>
                    <li>Diploma in Creative Visualization &nbsp;-&nbsp; (2024 &nbsp;-&nbsp; 2025)</li>
                    <h3 id="h-info">Sofwares</h3>
                    <div id="soft-name">
                        <ul>
                            <li>Photoshop</li>
                            <li>Illustrator</li>
                            <li>Premier Pro</li>
                            <li>After Effects</li>
                        </ul>
                    </div>
                    <h3 id="h-info">Work Experience</h3>
                    <li>GRAPHIC DESIGNER &nbsp;-&nbsp; Cocoma digital PVT LTD</li>
                    <li style={{marginLeft: "5%"}}>Intern &nbsp;-&nbsp; from august 2023 to march 2024</li>
                    <li style={{marginLeft: "5%"}}>Full time from march 2024 &nbsp;-&nbsp; july 2024</li>
                    <li>PRODUCT PHOTOGRAPHER &nbsp;-&nbsp; hivyu & aftertaste</li>
                    <li style={{marginLeft: "5%"}}>Intern &nbsp;-&nbsp; April to june 2023</li>
                </ul>
            </div>
        </>
    )
}