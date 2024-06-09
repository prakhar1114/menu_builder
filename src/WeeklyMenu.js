const weeklyMenu = {
    Monday: {
      Breakfast: ["Poha"],
      Lunch: ["Aloo matar", "Roti"],
      Dinner: ["Paneer bhurji", "Parval"],
    },
    Tuesday: {
      Breakfast: ["Aloo paratha", "Curd"],
      Lunch: ["Dal fry", "Cooker daal", "Rice"],
      Dinner: ["Fool gobhi"],
    },
    Wednesday: {
      Breakfast: ["Vermicelli"],
      Lunch: ["Loki", "Cooker daal", "Dal fry"],
      Dinner: ["Chhole"],
    },
    Thursday: {
      Breakfast: ["Sandwich"],
      Lunch: ["Chhola", "Barbatti"],
      Dinner: ["Noodles"],
    },
    Friday: {
      Breakfast: ["Methi paratha"],
      Lunch: ["Biryani", "Raita"],
      Dinner: ["Pumpkin"],
    },
    Saturday: {
      Breakfast: ["Cheela"],
      Lunch: ["Cabbage", "Cooker daal", "Dal fry"],
      Dinner: ["Rajma"],
    },
    Sunday: {
      Breakfast: ["Rajma"],
      Lunch: [], // Assuming lunch is empty or not specified for Sunday
      Dinner: ["Rajma"],
    },
  };

  export const tabularData = Object.entries(weeklyMenu).map(([day, meals]) => ({
      Day: day,
      Breakfast: meals.Breakfast.join(", "),
      Lunch: meals.Lunch.join(", "),
      Dinner: meals.Dinner.join(", "),
  }));


export default weeklyMenu;

export const tabular2DictMenu = (tabularMenu) => {
  const menu = {};
  tabularMenu.forEach((val) => {
    menu[val.Day] = {
      "Breakfast": val.Breakfast.split(', '),
      "Lunch": val.Lunch.split(', '),
      "Dinner": val.Dinner.split(', '),
    }
  })
  return menu;
}

export const cleanup = (comma_separated_string) => {
  return comma_separated_string.split(',')
  .map(item => item.trim())
  .filter(item => item!=='')
  .join(', ')
}

export const remove_extra_commas = (menu) => {
  const cleaned_menu = menu.map(val=> ({
    Day: val.Day,
    Breakfast: cleanup(val.Breakfast),
    Lunch: cleanup(val.Lunch),
    Dinner: cleanup(val.Dinner),
  })
  );

  return cleaned_menu;
}