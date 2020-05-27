import { action, ActionType } from 'typesafe-actions';


export enum ActionTypes {
  SEND_MAIL = 'SEND_MAIL',
  SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS',
  SEND_MAIL_FAILURE = 'SEND_MAIL_FAILURE',

  SEND_MAIL_RESET = 'SEND_MAIL_RESET',
}

export const Actions = {
  sendMail: (msg: string) => action(ActionTypes.SEND_MAIL, msg),
  sendMailSuccess: (payload: string) => action(ActionTypes.SEND_MAIL_SUCCESS, payload),
  sendMailFailure: (error: any) => action(ActionTypes.SEND_MAIL_FAILURE, error),

  sendReset: () => action(ActionTypes.SEND_MAIL_RESET),
};

export type ActionTypeUnion = ActionType<typeof Actions>;
