const NEW_WALLET_DATA      = 'NEW_WALLET_DATA';

const initialState = {
  description: '',
  amount: 0,
  type: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
     case NEW_WALLET_DATA:
      return {
        ...state,
        description:    action.description,
        amount:    action.amount,
        actype: action.actype
      };

      default:
        return state;

  }
}

export function newWalletData(data) {
  return {
    type:         NEW_WALLET_DATA,
    description:  data.description,
    amount:    data.amount,
    asctype:    data.type
  };
}