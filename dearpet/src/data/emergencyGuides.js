const emergencyGuides = [
    {
        title: "구강 질환",
        description: "치석 축적 및 세균 감염으로 인한 질환입니다.",
        image: "https://img.youtube.com/vi/example1/0.jpg",
        detail: "부드러운 칫솔이나 거즈로 치아를 부드럽게 닦아주고, 치석이 쌓이지 않도록 정기적으로 관리합니다. 심각한 통증이 있다면 물에 섞인 소금을 이용해 입안을 헹구어 주면 통증 완화에 도움이 됩니다.",
        source: "American Veterinary Medical Association (AVMA) - Dental Disease",
        sourceLink: "https://www.avma.org/resources-tools/pet-owners/petcare/dental-disease"
    },
    {
        title: "비뇨기 질환",
        description: "세균 감염 및 신장 결석으로 인한 질환입니다.",
        image: "https://img.youtube.com/vi/example2/0.jpg",
        detail: "물 섭취를 늘릴 수 있도록 신선한 물을 제공하고, 구연산이 포함된 사료를 주어 결석 예방에 도움이 되도록 합니다. 배뇨 시도가 지속되면 따뜻한 물수건으로 배를 부드럽게 마사지해 주면 도움이 될 수 있습니다.",
        source: "Veterinary Partner - Urinary Tract Infection",
        sourceLink: "https://veterinarypartner.com/"
    },
    {
        title: "피부 알레르기",
        description: "음식 및 환경적 요인으로 인한 피부 문제입니다.",
        image: "https://img.youtube.com/vi/example3/0.jpg",
        detail: "가려움증을 줄이기 위해 애완동물용 오트밀 샴푸로 목욕해 주고, 가려운 부위에 알로에 베라 젤을 발라주면 진정 효과를 줄 수 있습니다.",
        source: "American Kennel Club (AKC) - Allergies",
        sourceLink: "https://www.akc.org/expert-advice/health/allergies/"
    },
    {
        title: "구토 및 설사",
        description: "음식 중독이나 기생충 감염 등으로 인한 증상입니다.",
        image: "https://img.youtube.com/vi/example4/0.jpg",
        detail: "구토가 있을 경우, 12시간 동안 음식을 금지하고 소량의 물만 제공하여 탈수를 방지합니다. 이후, 부드러운 사료를 소량씩 급여하면서 상태를 지켜보세요.",
        source: "PetMD - Vomiting and Diarrhea",
        sourceLink: "https://www.petmd.com/"
    },
    {
        title: "슬개골 탈구",
        description: "관절의 기형으로 인해 발생하는 질환입니다.",
        image: "https://img.youtube.com/vi/example5/0.jpg",
        detail: "탈구가 발생한 경우, 해당 다리를 사용하지 않도록 안정을 취하게 하며, 얼음찜질로 부기를 줄여줍니다. 반려동물이 편안하게 쉴 수 있도록 안정된 공간을 마련해 주세요.",
        source: "Veterinary Medical Center of New York University - Patellar Luxation",
        sourceLink: "https://www.vet.cornell.edu/"
    },
    {
        title: "중독",
        description: "독성 물질 섭취로 인한 응급상황입니다.",
        image: "https://img.youtube.com/vi/example6/0.jpg",
        detail: "중독이 의심될 경우, 즉시 해당 독성 물질의 정보를 기록한 후, 물을 조금씩 제공해 주어 구토를 유도합니다. 그러나, 유도 구토가 위험할 수 있는 경우가 있으니 주의가 필요합니다.",
        source: "ASPCA - Animal Poison Control",
        sourceLink: "https://www.aspca.org/pet-care/animal-poison-control"
    },
    {
        title: "열사병",
        description: "과도한 더위로 인해 발생하는 질환입니다.",
        image: "https://img.youtube.com/vi/example7/0.jpg",
        detail: "신속히 시원한 그늘로 이동시키고, 물을 충분히 제공하여 탈수를 예방합니다. 차가운 수건으로 몸을 적셔주거나, 미지근한 물로 목욕시켜 체온을 낮춰주세요.",
        source: "VCA Animal Hospitals - Heat Stroke",
        sourceLink: "https://vcahospitals.com/"
    },
    {
        title: "호흡곤란",
        description: "호흡이 어려울 때 발생하는 증상입니다.",
        image: "https://img.youtube.com/vi/example8/0.jpg",
        detail: "공기가 잘 통하는 시원한 장소로 이동하고, 목 주변을 가볍게 마사지하여 긴장을 풀어줍니다. 상태가 호전되지 않으면 급히 냉각을 위해 물로 적셔 주는 것이 좋습니다.",
        source: "The Merck Veterinary Manual - Respiratory Disorders",
        sourceLink: "https://www.merckvetmanual.com/"
    },
    {
        title: "관절염",
        description: "나이가 많거나 과체중인 반려동물에서 흔히 발생합니다.",
        image: "https://img.youtube.com/vi/example9/0.jpg",
        detail: "따뜻한 물수건으로 관절 부위를 마사지하고, 체중을 관리하여 관절에 부담을 덜어줍니다. 소량의 오메가-3 지방산이 포함된 사료를 제공하면 관절 건강에 도움이 됩니다.",
        source: "PetMD - Arthritis",
        sourceLink: "https://www.petmd.com/"
    },
    {
        title: "장염",
        description: "소화불량이나 세균 감염으로 인한 장의 염증입니다.",
        image: "https://img.youtube.com/vi/example10/0.jpg",
        detail: "소량의 식사로 유지하고, 전해질 수액을 제공하여 수분을 공급합니다. 고구마와 같은 소화가 쉬운 음식을 제공하며, 설사가 심할 경우 음식을 일시적으로 금지합니다.",
        source: "Veterinary Partner - Enteritis",
        sourceLink: "https://veterinarypartner.com/"
    },
    {
        title: "갑상선 기능 저하증",
        description: "호르몬 불균형으로 인해 발생하는 질환입니다.",
        image: "https://img.youtube.com/vi/example11/0.jpg",
        detail: "갑상선에 좋은 해조류(예: 김)를 소량 제공하여 도움이 될 수 있습니다. 규칙적인 운동을 통해 비만 예방에 힘쓰고, 상태를 주의 깊게 관찰하세요.",
        source: "Vetinfo - Hypothyroidism in Dogs",
        sourceLink: "https://www.vetinfo.com/"
    },
    {
        title: "심장사상충",
        description: "모기 매개로 전파되는 기생충 질환입니다.",
        image: "https://img.youtube.com/vi/example12/0.jpg",
        detail: "반려동물의 심장 건강을 위해 정기적으로 심장사상충 예방약을 제공하며, 증상이 나타날 경우 적절한 운동량을 유지해 주는 것이 중요합니다.",
        source: "American Heartworm Society - Heartworm Disease",
        sourceLink: "https://www.heartwormsociety.org/"
    },
    {
        title: "낙상",
        description: "높은 곳에서 떨어져서 발생하는 부상입니다.",
        image: "https://img.youtube.com/vi/example13/0.jpg",
        detail: "부상 부위를 고정하고, 필요 시 냉찜질로 부기 완화에 도움을 줍니다. 이동이 불가능할 경우 수의사에게 즉시 연락하세요.",
        source: "PetMD - Falls",
        sourceLink: "https://www.petmd.com/"
    },
    {
        title: "감기",
        description: "기온 변화에 민감한 반려동물에서 흔히 발생합니다.",
        image: "https://img.youtube.com/vi/example14/0.jpg",
        detail: "따뜻한 환경을 유지하고, 수분을 충분히 공급하며, 기침이나 재채기 시 부드러운 수건으로 입을 막아 주어 감염 확산을 줄입니다.",
        source: "ASPCA - Cold Symptoms",
        sourceLink: "https://www.aspca.org/pet-care/animal-poison-control"
    },
    {
        title: "비만",
        description: "과식과 운동 부족으로 인해 발생합니다.",
        image: "https://img.youtube.com/vi/example15/0.jpg",
        detail: "체중 감량을 위해 저칼로리 사료로 전환하고, 규칙적인 운동을 통해 체중 조절에 신경 써야 합니다. 간식을 줄이고, 적절한 식사량을 유지하세요.",
        source: "Association for Pet Obesity Prevention - Obesity in Pets",
        sourceLink: "https://petobesityprevention.org/"
    },
    {
        title: "결막염",
        description: "눈 주위의 염증으로 발생하는 질환입니다.",
        image: "https://img.youtube.com/vi/example16/0.jpg",
        detail: "부드러운 물수건으로 눈 주변을 청결하게 유지하고, 수의사에게 적절한 약물을 처방받아 사용하세요.",
        source: "American Academy of Veterinary Ophthalmology - Conjunctivitis",
        sourceLink: "https://www.aavoc.org/"
    },
    {
        title: "두드러기",
        description: "알레르기 반응으로 인한 피부 발진입니다.",
        image: "https://img.youtube.com/vi/example17/0.jpg",
        detail: "가려운 부위를 시원한 물로 씻어내고, 알레르기 유발 요인을 피하세요. 필요 시 수의사에게 약물 처방을 받을 수 있습니다.",
        source: "Veterinary Dermatology - Allergic Reactions",
        sourceLink: "https://www.veterinarydermatology.com/"
    },
    {
        title: "기생충 감염",
        description: "내부 또는 외부 기생충으로 인한 감염입니다.",
        image: "https://img.youtube.com/vi/example18/0.jpg",
        detail: "정기적으로 기생충 예방약을 복용하고, 기생충 감염 시 즉시 치료를 받도록 합니다. 주기적인 건강 검진을 통해 기생충 감염을 예방할 수 있습니다.",
        source: "American Veterinary Medical Association (AVMA) - Parasites",
        sourceLink: "https://www.avma.org/resources-tools/pet-owners/petcare/parasites"
    },
    {
        title: "신부전",
        description: "신장 기능 저하로 인한 질환입니다.",
        image: "https://img.youtube.com/vi/example19/0.jpg",
        detail: "신장 기능이 저하되면 수분 섭취를 늘리고, 저단백질 식이요법을 통해 신장에 부담을 줄여줍니다. 주기적인 검사를 통해 상태를 점검하세요.",
        source: "Veterinary Partner - Kidney Disease",
        sourceLink: "https://veterinarypartner.com/"
    },
    {
        title: "전염성 복막염 (FIP)",
        description: "전염성이 강한 바이러스 감염입니다.",
        image: "https://img.youtube.com/vi/example20/0.jpg",
        detail: "FIP는 주로 고양이에게 영향을 미치며, 증상이 나타나면 즉시 수의사에게 연락하여 진단 및 치료를 받는 것이 중요합니다.",
        source: "Cornell University College of Veterinary Medicine - FIP",
        sourceLink: "https://www.vet.cornell.edu/"
    },
    {
        title: "부상 및 외상",
        description: "사고로 인한 부상입니다.",
        image: "https://img.youtube.com/vi/example21/0.jpg",
        detail: "부상이 발생한 경우 즉시 상처를 깨끗하게 씻고, 필요 시 압박붕대로 감싸 주세요. 통증이 심하거나 출혈이 지속된다면 수의사에게 문의하세요.",
        source: "American Animal Hospital Association (AAHA) - First Aid for Pets",
        sourceLink: "https://www.aaha.org/"
    },
    {
        title: "소화불량",
        description: "소화 과정에서의 문제입니다.",
        image: "https://img.youtube.com/vi/example22/0.jpg",
        detail: "소화 불량이 의심되는 경우, 소량의 소화가 쉬운 음식을 제공하고, 급하게 먹지 않도록 주의하세요. 상태가 나아지지 않으면 수의사에게 상담하세요.",
        source: "PetMD - Indigestion",
        sourceLink: "https://www.petmd.com/"
    }
];

export default emergencyGuides;