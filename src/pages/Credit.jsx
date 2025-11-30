import "../css/credit.css"
import "../css/style.css"

export default function Credit() {
    return (
        <>
            <h2 className="credit-title">Credits</h2>
            <div className="credits-container">
              <ul className="credits-list">
                <h3 id="att">Attributing Icon Creators</h3>
                <li> <span className="myself" style={{marginLeft: "0"}}></span> <a href="https://www.flaticon.com/free-icons/analysis" target="_blank" title="analysis icons">Analysis icons created by lakonicon - Flaticon</a></li>
                <li> <span className="ai" style={{marginLeft: "0"}}></span> <a href="https://www.flaticon.com/free-icons/technology" target="_blank" title="technology icons">Technology icons created by iconixar - Flaticon</a> </li>
                <li> <span className="thumb" style={{marginLeft: "0"}}></span> <a href="https://www.flaticon.com/free-icons/thumbnail" target="_blank" title="thumbnail icons">Thumbnail icons created by Prashu Rapol - Flaticon</a></li>
                <li> <span className="poster" style={{marginLeft: "0"}}></span> <a href="https://www.flaticon.com/free-icons/poster" target="_blank" title="poster icons">Poster icons created by Superarticons - Flaticon</a></li>
                <li> <span className="credit" style={{marginLeft: "0"}}></span> <a href="https://www.flaticon.com/free-icons/credit" target="_blank" title="credit icons">Credit icons created by Freepik - Flaticon</a></li>
                <h3 id="att">Other owners of work</h3>
                <li id="special"> <a href="https://www.behance.net/manthanartschool" target="_blank" title="manthanArtSchool">Manthan Art School</a></li>
              </ul>
            </div>
        </>
    )
}