// @flow
import * as t from "typed-contracts";
import { validate, type ExtractType } from "./validator";

const campaignContract = t.isObject({
  id: t.isNumber,
  campaignName: t.isString,
  dispatchTo: t.isString,
  leadQty: t.isNumber,
  status: t.isUnion(t.isNumber, t.isBoolean),
  widget: t.isObject({
    title: t.isString,
    subTitle: t.isString,
    inputPrompt: t.isString,
    position: t.isString
  }),
  companyId: t.isNumber
})("campaign");

export type CampaignType = ExtractType<typeof campaignContract>;
export const validateCampaign = validate<CampaignType>(campaignContract);
