import gql from "graphql-tag";

export const GET_FOOD = gql`
  query getFood($name: String!) {
    getFood(name: $name) {
      _id
      name
      type 
      vitamins{name}
      minerals{name}
       nutritions{name}
       healthBenefits{name}
    }
  }
`;

export const GET_FRUIT = gql`
   query getFruits{
     getFruits{
       _id,
      name,
      vitamins{name,quantity,unit},
      minerals{name,quantity,unit},
      healthBenefits{name}
    }
  }
`;
export const GET_VITAMIN = gql`
   query vitamin{
     vitamin{
       _id,
      name
    }
  }
`;
export const ADD_TODO = gql`
  mutation addItem($name: String!,
    $type: String!,
    $isActive: String,
    $imageUrl: String!,
    $healthBenefits: [HealthTipData]!,
    $vitamins: [NutrientFactData]!,
    $minerals:[NutrientFactData]!,
    $nutrientFacts: [NutrientFactData]!) {
    addItem(name: $name, type: $type,isActive:$isActive,
      imageUrl:$imageUrl,healthBenefits:$healthBenefits,
      vitamins:$vitamins,nutrientFacts:$nutrientFacts,minerals:$minerals) {
        name
        type
        isActive
        imageUrl
        healthBenefits{name}
        vitamins{name,unit,quantity}
        minerals{name,unit,quantity}
        nutritions{name,unit,quantity}
    }
  }
`;