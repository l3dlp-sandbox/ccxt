import { Exchange } from "../../../ccxt";
declare function testFetchLeverageTiers(exchange: Exchange, skippedProperties: object, symbol: string): Promise<boolean>;
export default testFetchLeverageTiers;
