import img1 from "./assets/img/clean1.jpg";
import img2 from "./assets/img/clean2.jpg";
import img3 from "./assets/img/schedule2.jpg";
import img4 from "./assets/img/clean4.jpg";

const About = () => {
  return (
    <div id="divConocerlo" class="bg-light">
      {/* <h1 class="text-center bg-light p-0 m-0 pt-5 pb-5 display-4 fw-bold">
        <strong>Scrubbit Car Wash</strong>
      </h1> */}
      <div class="container" id="contentOm">
        <div class="row p-0 m-0 bg-light" id="franja1">
          <div class="col align-self-center p-4 m-4 text-body">
            <h1 class="display-5">
              <i class="fa fa-question-circle-o"></i>&nbsp;How it works
            </h1>
            <h6 class="mt-3">
              Scrubbit is a platform that helps connect professional car washers
              &amp; detailers with customers in need of a wash! With scrubbit,
              you can schedule a wash in the future or place an order for right
              now and a scrubber will be dispatched to your specified location.
              Availability of scrubbers is subject to your area and is not
              gauranteed.&nbsp;
            </h6>
          </div>
          <div class="col-12 col-md-6 p-0 m-0">
            <img class="img-fluid" src={img1} />
          </div>
        </div>
        <div class="row p-0 m-0 bg-light" id="franja2">
          <div class="col-12 col-md-6 p-0 m-0 order-1">
            <img class="img-fluid" src={img2} />
          </div>
          <div class="col align-self-center p-4 m-4 text-body order-md-1">
            <h1 class="display-5">
              <i class="fa fa-clock-o"></i>&nbsp;Scheduling
            </h1>
            <h6 class="mt-3">
              Scheduling a wash can be easily done in the app. From the
              dashboard navigate to -&gt; Schedule Wash. From here, you can
              browse local scrubbers who are available for scheduled washes. It
              is important to leave the vehicle at the specified location &amp;
              time. If the scrubber cannot find the vehicle, you as the customer
              may be charged a fee to cover the scrubber's time and expenses. We
              recommend scheduling a wash while you're at home or at work.
              Provide any access codes/pins ahead of time.
            </h6>
          </div>
        </div>
        <div class="row p-0 m-0 bg-light" id="franja3">
          <div class="col align-self-center p-4 m-4 text-body">
            <h1 class="display-5">
              <i class="fas fa-location-arrow"></i>&nbsp;On-Demand
            </h1>
            <h6 class="mt-3">
              You can order a car wash on demand from the dashboard. Select
              'Order Service Now' and follow the prompts for required
              information &amp; payment and a scrubber will be dispatched to
              your location. Availability of scrubbers will vary on your
              location and the population of scrubbers in your area. We cannot
              gaurantee a scrubber will be available at any particular time of
              the day.&nbsp;
            </h6>
          </div>
          <div class="col-12 col-md-6 p-0 m-0">
            <img class="img-fluid" src={img3} />
          </div>
        </div>
        <div class="row p-0 m-0 bg-light" id="franja4">
          <div class="col-12 col-md-6 p-0 m-0 order-1">
            <img class="img-fluid" src={img4} />
          </div>
          <div class="col align-self-center p-4 m-4 text-body order-md-1">
            <h1 class="display-5">
              <i class="fa fa-dollar"></i>&nbsp;Become a Scrubber
            </h1>
            <h6 class="mt-3">
              Earn money by washing cars on demand or by scheduling jobs that
              fit your lifestyle. Currently Scrubbit is supported in Atlanta,
              Ga. However, if you do not live here, contact us and we can work
              something out for you in your city.&nbsp;
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
