export interface QuizQuestion {
 question: string;
 isFact: boolean;
 explain: string;
 category: string;
}

export const healthQuizBank: Record<string, QuizQuestion[]> = {
 "Climate Change": [
 { question: "Can extreme heatwaves make Malaria spread faster in cool highlands?", isFact: true, explain: "Rising temperatures allow mosquitoes to survive in higher altitudes where it was previously too cold.", category: "Climate Change" },
 { question: "Is the current heatwave in Uganda caused by 5G internet towers?", isFact: false, explain: "Heatwaves are caused by greenhouse gases and atmospheric pressure, not internet signals.", category: "Climate Change" },
 { question: "Can heavy flooding in urban areas lead to Cholera outbreaks?", isFact: true, explain: "Floods mix sewage with drinking water, spreading waterborne diseases rapidly.", category: "Climate Change" },
 { question: "Does 'hot air' during the dry season make HIV medicine stop working?", isFact: false, explain: "Heat doesn't stop the medicine working, but meds should be stored cool to stay effective.", category: "Climate Change" },
 { question: "Can prolonged droughts increase malnutrition among children?", isFact: true, explain: "Droughts cause crop failure, leading to food shortages and poor nutrition.", category: "Climate Change" },
 { question: "Is the dust during the dry season a major cause of coughs and flu?", isFact: true, explain: "Dust irritates the respiratory system and carries bacteria, making infections easier.", category: "Climate Change" },
 { question: "Do floods 'clean' the environment by washing away all germs?", isFact: false, explain: "Floods spread germs from latrines and garbage into the water people use.", category: "Climate Change" },
 { question: "Can climate change make asthma symptoms worse?", isFact: true, explain: "Increased dust, pollen, and heat can trigger more frequent asthma attacks.", category: "Climate Change" },
 { question: "Is the drying of Lake Victoria caused by people over-using it for laundry?", isFact: false, explain: "Changes in lake levels are driven by rainfall patterns and global climate shifts.", category: "Climate Change" },
 { question: "Can extreme heat cause more frequent headaches and dizziness?", isFact: true, explain: "Yes, heat exhaustion and dehydration lead directly to these symptoms.", category: "Climate Change" }
 ],
 "Mental Health": [
 { question: "Is mental illness a result of being cursed or 'bewitched'?", isFact: false, explain: "Mental illness is a medical condition involving brain chemistry, not witchcraft.", category: "Mental Health" },
 { question: "Can talking about your problems with a friend help improve your mood?", isFact: true, explain: "Social support is a proven way to reduce stress and improve mental well-being.", category: "Mental Health" },
 { question: "Are people with mental health issues always 'crazy' or violent?", isFact: false, explain: "Most people with mental health issues live quiet lives and are more likely to be victims than violent.", category: "Mental Health" },
 { question: "Can heavy use of alcohol lead to long-term depression?", isFact: true, explain: "Alcohol is a depressant and disrupts the brain chemicals that regulate mood.", category: "Mental Health" },
 { question: "Is depression just 'laziness' that someone can snap out of?", isFact: false, explain: "Depression is a serious clinical condition that often requires therapy or medicine.", category: "Mental Health" },
 { question: "Can physical exercise help reduce anxiety?", isFact: true, explain: "Exercise releases endorphins, which are natural stress-fighters for the brain.", category: "Mental Health" },
 { question: "Are children too young to have mental health problems?", isFact: false, explain: "Children can experience anxiety and trauma that require professional support.", category: "Mental Health" },
 { question: "Can poor sleep for a long time damage your mental health?", isFact: true, explain: "Sleep is vital for brain repair; lack of it increases risks of mood disorders.", category: "Mental Health" },
 { question: "Is it shameful to see a doctor for 'overthinking' or stress?", isFact: false, explain: "Seeking help for stress is a sign of strength and self-care.", category: "Mental Health" },
 { question: "Can 'broken heart' syndrome actually affect your physical heart?", isFact: true, explain: "Extreme emotional stress can cause temporary heart failure symptoms.", category: "Mental Health" }
 ],
 "HIV": [
 { question: "Does drinking lemon water cure HIV if taken daily?", isFact: false, explain: "Only ARVs can manage HIV. Lemon water does not kill the virus.", category: "HIV" },
 { question: "Can you get HIV from sharing a meal with someone positive?", isFact: false, explain: "HIV is not spread through saliva or sharing food; it requires blood or sexual contact.", category: "HIV" },
 { question: "Can a person on ARVs with an 'Undetectable' load pass on the virus?", isFact: false, explain: "Correct! Undetectable = Untransmittable (U=U).", category: "HIV" },
 { question: "Does HIV only affect certain types of people?", isFact: false, explain: "HIV can affect anyone regardless of age, gender, or background.", category: "HIV" },
 { question: "Can a mother with HIV give birth to a baby who is negative?", isFact: true, explain: "Yes, with proper PMTCT treatment, the risk of transmission is very low.", category: "HIV" },
 { question: "Is there a permanent herbal cure for HIV in Uganda?", isFact: false, explain: "There is no herbal cure; only ARVs are scientifically proven to manage HIV.", category: "HIV" },
 { question: "Can you tell if someone has HIV just by looking at them?", isFact: false, explain: "Many people with HIV look perfectly healthy and may not even know they have it.", category: "HIV" },
 { question: "Does circumcision reduce the risk of HIV for men?", isFact: true, explain: "Safe male circumcision reduces the risk of female-to-male transmission by 60%.", category: "HIV" },
 { question: "Can HIV survive for a long time on a toilet seat?", isFact: false, explain: "The virus dies very quickly once it is outside the human body.", category: "HIV" },
 { question: "Should you stop taking ARVs if you feel better?", isFact: false, explain: "Stopping meds allows the virus to multiply and become resistant to treatment.", category: "HIV" }
 ],
 "Vaccines": [
 { question: "Is the new Malaria vaccine safe for children under 5?", isFact: true, explain: "The WHO and Uganda MoH have verified it as safe and life-saving.", category: "Vaccines" },
 { question: "Do vaccines contain microchips to monitor citizens?", isFact: false, explain: "Vaccines are medicine designed to train your immune system, not electronic devices.", category: "Vaccines" },
 { question: "Can the HPV vaccine prevent cervical cancer in girls?", isFact: true, explain: "Yes, it protects against the virus that causes most cases of cervical cancer.", category: "Vaccines" },
 { question: "Is it better for a child to get the disease naturally than to be vaccinated?", isFact: false, explain: "Diseases like Polio or Measles can cause permanent disability or death; vaccines are much safer.", category: "Vaccines" },
 { question: "Do vaccines cause Autism in children?", isFact: false, explain: "Extensive scientific studies have proven there is no link between vaccines and autism.", category: "Vaccines" },
 { question: "Can you get the flu from the flu vaccine?", isFact: false, explain: "The vaccine uses a dead virus that cannot cause the illness.", category: "Vaccines" },
 { question: "Should adults also get booster vaccines for Tetanus?", isFact: true, explain: "Yes, immunity can fade over time, and boosters keep you protected.", category: "Vaccines" },
 { question: "Does the Polio vaccine make children infertile?", isFact: false, explain: "This is a myth. The vaccine only protects against paralysis.", category: "Vaccines" },
 { question: "Is the COVID-19 vaccine still effective against new variants?", isFact: true, explain: "Vaccines continue to provide strong protection against severe illness and death.", category: "Vaccines" },
 { question: "Can multiple vaccines at once overwhelm a baby's immune system?", isFact: false, explain: "A baby's immune system handles thousands of germs daily; vaccines are a small, safe addition.", category: "Vaccines" }
 ],
 "Malaria": [
 { question: "Does eating sugary foods like mangoes cause Malaria?", isFact: false, explain: "Malaria is caused by parasites from a mosquito bite, not by what you eat.", category: "Malaria" },
 { question: "Can Malaria be spread from one person to another by sneezing?", isFact: false, explain: "No, it is not airborne. It requires a mosquito to move the parasite.", category: "Malaria" },
 { question: "Is sleeping under a treated net the best way to prevent Malaria?", isFact: true, explain: "Nets provide a physical and chemical barrier against mosquitoes at night.", category: "Malaria" },
 { question: "Can you build 'natural immunity' so you never need Malaria medicine?", isFact: false, explain: "You can develop partial immunity, but you can still get very sick or die without treatment.", category: "Malaria" },
 { question: "Does 'Waragi' (local gin) kill Malaria parasites in the blood?", isFact: false, explain: "Alcohol does not treat Malaria and can actually make your recovery harder.", category: "Malaria" },
 { question: "Can clearing stagnant water around your house reduce mosquitoes?", isFact: true, explain: "Mosquitoes lay eggs in still water; removing it stops them from breeding.", category: "Malaria" },
 { question: "Is Malaria especially dangerous for pregnant women?", isFact: true, explain: "Yes, it can cause anemia, miscarriage, or low birth weight.", category: "Malaria" },
 { question: "Can a person have Malaria without having a fever?", isFact: true, explain: "In the early stages or in some adults, symptoms can be mild or unusual.", category: "Malaria" },
 { question: "Do mosquitoes only bite at exactly midnight?", isFact: false, explain: "The Anopheles mosquito bites mostly between dusk and dawn (evening to morning).", category: "Malaria" },
 { question: "Is it safe to stop Malaria dose once the fever goes away?", isFact: false, explain: "You must finish the full dose to ensure all parasites are killed.", category: "Malaria" }
 ],
 "Nutrition": [
 { question: "Does eating silverfish (Mukene) help children's brain development?", isFact: true, explain: "Mukene is rich in Omega-3 and proteins vital for brain growth.", category: "Nutrition" },
 { question: "Is soda a good replacement for water if you are dehydrated?", isFact: false, explain: "Sugar in soda can make dehydration worse; clean water is always best.", category: "Nutrition" },
 { question: "Can eating too much salt lead to high blood pressure?", isFact: true, explain: "High salt intake makes the body hold water, putting pressure on your heart.", category: "Nutrition" },
 { question: "Does 'yellow' maize have more vitamins than white maize?", isFact: true, explain: "Yellow maize contains Vitamin A, which is essential for good eyesight.", category: "Nutrition" },
 { question: "Can garlic cure a person of COVID-19 or the flu?", isFact: false, explain: "Garlic is healthy for the heart but does not cure viral infections.", category: "Nutrition" },
 { question: "Is breastfeeding exclusively for 6 months best for a baby?", isFact: true, explain: "Breast milk contains all the nutrients and antibodies a baby needs for the first 6 months.", category: "Nutrition" },
 { question: "Does eating soil (Pica) mean you are lacking minerals?", isFact: true, explain: "Often, the urge to eat soil is a sign of iron or zinc deficiency.", category: "Nutrition" },
 { question: "Is energy-giving food like Matooke enough for a child to grow?", isFact: false, explain: "Matooke provides energy, but children also need 'body-building' proteins like beans or eggs.", category: "Nutrition" },
 { question: "Can drinking tea immediately after a meal stop iron absorption?", isFact: true, explain: "Tannins in tea can interfere with how your body takes in iron from food.", category: "Nutrition" },
 { question: "Does eating eggs make a child slow to start speaking?", isFact: false, explain: "This is a myth. Eggs are excellent for brain and physical development.", category: "Nutrition" }
 ],
 "Pregnancy": [
 { question: "Should a pregnant woman eat twice as much food as usual?", isFact: false, explain: "She needs more nutrients, not double the volume of food.", category: "Pregnancy" },
 { question: "Can a pregnant woman take any medicine without a doctor's advice?", isFact: false, explain: "Many medicines can harm the developing baby; always check with a midwife.", category: "Pregnancy" },
 { question: "Is regular walking good for most pregnant women?", isFact: true, explain: "Gentle exercise helps with blood circulation and prepares the body for birth.", category: "Pregnancy" },
 { question: "Can a 'sharp' belly shape tell you the baby is a boy?", isFact: false, explain: "Belly shape is determined by muscle tone and baby position, not gender.", category: "Pregnancy" },
 { question: "Does sleeping on the back become risky in late pregnancy?", isFact: true, explain: "Sleeping on the side (especially left) is better for blood flow to the baby.", category: "Pregnancy" },
 { question: "Is it safe to drink small amounts of alcohol while pregnant?", isFact: false, explain: "There is no safe amount of alcohol during pregnancy; it can cause birth defects.", category: "Pregnancy" },
 { question: "Should a pregnant woman attend at least 8 ANC visits?", isFact: true, explain: "The WHO now recommends 8 contacts to ensure the safety of mother and child.", category: "Pregnancy" },
 { question: "Can stress during pregnancy affect the baby's development?", isFact: true, explain: "High stress levels can lead to lower birth weights or early delivery.", category: "Pregnancy" },
 { question: "Does eating honey cause the baby to have 'sticky' skin?", isFact: false, explain: "This is a myth. Honey is safe for mothers (but not for babies under 1 year).", category: "Pregnancy" },
 { question: "Is swollen feet always a normal sign of pregnancy?", isFact: false, explain: "Mild swelling is common, but sudden swelling can be a sign of high blood pressure (Preeclampsia).", category: "Pregnancy" }
 ]
};

export const allQuestionsFlat = Object.values(healthQuizBank).flat();
