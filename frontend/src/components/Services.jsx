import {
FaTools,
FaTint,
FaShower,
FaBath
} from "react-icons/fa";

export default function Services() {

const services=[
{
icon:<FaTools/>,
title:"Leak Repair"
},
{
icon:<FaTint/>,
title:"Pipe Installation"
},
{
icon:<FaShower/>,
title:"Bathroom Plumbing"
},
{
icon:<FaBath/>,
title:"Water Heater"
}
];

return(

<section id="services" className="services">

<h2>Our Services</h2>

<div className="cards">

{services.map((item,index)=>(

<div className="card" key={index}>
{item.icon}
<h3>{item.title}</h3>
<p>
Professional plumbing work with quality guarantee.
</p>
</div>

))}

</div>

</section>

);

}