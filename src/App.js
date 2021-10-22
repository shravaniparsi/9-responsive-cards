import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const data = [
    {
      id: "TRAVEL-COVER-INS",
      type: "travel",
      title: "London to Paris",
      description: "Baggage Cover; Medical Cover; Cancellation Cover",
      status: "active",
      premium: 106.65,
      premium_formatted: "AUD $106.65",
      payment_date: "2019-10-10T13:29:38.814849Z",
      coverage_start_date: "2019-11-17",
      coverage_end_date: "2019-11-19",
      renewal: null,
      partner: {
        id: "labore",
        name: "Labore Inc.",
        logo:
          "https://s3-ap-southeast-2.amazonaws.com/cg-frontend-tests/labore.svg"
      }
    },
    {
      id: "PRODUCT-COVER-INS",
      type: "product",
      title: "Sony Laptop, Mitsubishi Laptop, Mitsubishi Laptop",
      description: "Full Product Cover",
      status: "active",
      premium: 50.15,
      premium_formatted: "AUD $50.15",
      payment_date: "2019-11-10T13:29:38.814849Z",
      coverage_start_date: "2019-12-11",
      coverage_end_date: "2020-12-11",
      renewal: "annual",
      partner: {
        id: "aliqua",
        name: "Aliqua Pty Ltd",
        logo:
          "https://s3-ap-southeast-2.amazonaws.com/cg-frontend-tests/aliqua.svg"
      }
    },
    {
      id: "PARCEL-COVER-INS",
      type: "parcel",
      title: "Parcel shipment to America",
      description: "Parcel Insurance",
      status: "expired",
      premium: 10.65,
      premium_formatted: "AUD $10.65",
      payment_date: "2019-01-01T13:29:38.814849Z",
      coverage_start_date: "2019-01-17",
      coverage_end_date: null,
      renewal: null,
      partner: {
        id: "magna",
        name: "Magna Co.",
        logo:
          "https://s3-ap-southeast-2.amazonaws.com/cg-frontend-tests/magna.svg"
      }
    }
  ];
  const sampleobj = {}
  data.forEach(item => {
    sampleobj[item.id] = false;
  });
  const [width, setWidth] = useState(window.innerWidth);
  let [activeStatus, setActiveStatus] = useState(sampleobj);
  const breakpoint = 480;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => handleWindowResize());
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize());
    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);

  const clickFunction = id => {
    // get id of card and update it's status in obj
    const currentValue = activeStatus[id];
    const obj = {...activeStatus};
    obj[id] = !currentValue;
    setActiveStatus(obj);
    console.log(activeStatus);
  };
  return (
    <div>
      <div className="cards">
        <h2>YOUR POLICES</h2>
        {data.map((item, key) => {
          console.log(activeStatus);
          return (
            <div className="content" key={key} onClick={() => clickFunction(item.id)}>
              <div className="wrapper">
                <div
                  className={
                    "card " +
                    (activeStatus[item.id] ? "active-card" : "inactive-card")
                  }
                >
                  {width > breakpoint && (
                    <div className="media mediaImage float-right">
                      <img
                        src={item.partner.logo}
                        alt={item.partner.name}
                        width="640"
                        height="426"
                      />
                    </div>
                  )}
                  <div className="primary-title">
                    <div className="primary-text">
                      {width > breakpoint && (
                        <button
                          className={
                            "arrow-button " +
                            (activeStatus[item.id]
                              ? "active-button"
                              : "inactive-button")
                          }
                        >
                          {activeStatus[item.id] ? (
                            <i className="material-icons">
                              keyboard_arrow_down
                            </i>
                          ) : (
                            <i className="material-icons">chevron_right</i>
                          )}
                        </button>
                      )}
                      <div className="primary-text-wrapper">
                        <div className="secondary-text">{item.title}</div>
                        <div className="secondary-text">
                          XXXX-XXXX-INS | {item.description}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="main-divider" />
                  <div className="supporting-text">
                    <div className="secondary-text-wrapper">
                      {width > breakpoint && (
                        <div className="first-block">
                          <div className="secondary-text">
                            {item.coverage_start_date}
                          </div>
                          <div className="secondary-text">payment date</div>
                        </div>
                      )}
                      {width > breakpoint && (
                        <hr className="vertical-divider" />
                      )}
                      <div className="second-block">
                        <div className="secondary-text">
                          {item.coverage_start_date} to {item.coverage_end_date}
                        </div>
                        <div className="secondary-text-block-2">
                          <span>coverage dates</span>
                          <span
                            className={
                              item.status === "active" ? "active" : "expired"
                            }
                          >
                            {item.status} ●
                          </span>
                          {/* <span className="active">{item.status} ●</span> */}
                        </div>
                      </div>
                      {width > breakpoint && (
                        <hr className="vertical-divider" />
                      )}
                      {width > breakpoint && (
                        <div className="third-block">
                          <div className="secondary-text">AU $XX.XX</div>
                          <div className="secondary-text">price/premium</div>
                        </div>
                      )}
                      {width > breakpoint && item.renewal && (
                        <hr className="vertical-divider" />
                      )}
                      {width > breakpoint && item.renewal && (
                        <div className="third-block">
                          <div className="secondary-text">{item.renewal}</div>
                          <div className="secondary-text">renewal</div>
                        </div>
                      )}
                      {width < breakpoint && (
                        <div className="media mediaImage float-right small-screen-image">
                          <img
                            src={item.partner.logo}
                            alt={item.partner.name}
                            width="640"
                            height="426"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
