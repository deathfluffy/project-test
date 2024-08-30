import { Icon } from "../Icon/Icon.jsx";

const CategoryIcon = ({ category }) => {
  switch (category) {
    case "beds":
      return <Icon width="20" height="20" id="icon-beds" />;
    case "adults":
      return <Icon width="20" height="20" id="icon-users" />;
    case "Air conditioner":
      return <Icon width="20" height="20" id="icon-air" />;
    case "hob":
      return <Icon width="20" height="20" id="icon-hob" />;
    case "Gas":
      return <Icon width="20" height="20" id="icon-gas" />;
    case "Petrol":
      return <Icon width="20" height="20" id="icon-petrol" />;
    case "kitchen":
      return <Icon width="20" height="20" id="icon-kitchen" />;
    case "automatic":
      return <Icon width="20" height="20" id="icon-automatic" />;
    case "AC":
      return <Icon width="20" height="20" id="icon-AC" />;
    case "bathroom":
      return <Icon width="20" height="20" id="icon-showerWC" />;
    case "freezer":
      return <Icon width="20" height="20" id="icon-freezer" />;
    case "CD":
      return <Icon width="20" height="20" id="icon-cd" />;
    case "water":
      return <Icon width="20" height="20" id="icon-water" />;
    case "radio":
      return <Icon width="20" height="20" id="icon-radio" />;
    case "microwave":
      return <Icon width="20" height="20" id="icon-microwave" />;
    case "toilet":
      return <Icon width="20" height="20" id="icon-toilet-papers" />;
    case "TV":
      return <Icon width="20" height="20" id="icon-TV" />;
    default:
      return null;
  }
};
export default CategoryIcon;
