export interface QuizQuestion {
 question: string;
 isFact: boolean;
 explain: string;
 category: string;
}

export const healthQuizBank: Record<string, QuizQuestion[]> = {
 "Climate Change": [
 { 
 question: "Can extreme heatwaves make Malaria spread faster in cool highlands?", 
 isFact: true, 
 explain: "Yes, rising temperatures allow mosquitoes to survive in higher altitudes where they couldn't before.",
 category: "Climate Change"
 },
 { 
 question: "Does the moon's position cause the current heatwave in Uganda?", 
 isFact: false, 
 explain: "No, heatwaves are caused by atmospheric pressure and climate change, not the moon.",
 category: "Climate Change"
 }
 ],
 "Vaccines": [
 { 
 question: "Is the new Malaria vaccine safe for children under 5?", 
 isFact: true, 
 explain: "Correct! The WHO and Uganda MoH have verified it as safe and life-saving.",
 category: "Vaccines"
 }
 ],
 "HIV": [
 { 
 question: "Does drinking lemon water cure HIV if taken three times a day?", 
 isFact: false, 
 explain: "Incorrect. Only ARVs can manage HIV effectively.",
 category: "HIV"
 }
 ],
 "Malaria": [], 
 "Nutrition": [],
 "Maternal": []
};

// This flattens everything for the "Daily Quest" random mode
export const allQuestionsFlat = Object.values(healthQuizBank).flat();
