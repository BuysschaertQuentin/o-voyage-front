import Header from "../Header/Header";
import Footer from "../Footer/Footer";

 function FAQAccordion() {
  
  return (
    <div>
    <Header/>
    <div className="px-10 py-10">
      <div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" checked /> 
  <div className="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div className="collapse-content"> 
    <p>hello</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div className="collapse-content"> 
    <p>hello</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
    Click to open this one and close others
  </div>
  <div className="collapse-content"> 
    <p>hello</p>
  </div>
</div>
    </div>
    <Footer/>
    </div>

  );  
}

export default FAQAccordion;

