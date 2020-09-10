import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';

const CoinGeckoClient = new CoinGecko();
export default function Home(props) {
  const { data } = props.result;
  return (
    <div className={styles.container}>
      <Head>
        <title>Kapitalisasi Pasar Crypto</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Daftar 100 Kapitalisasi Pasar Crypto Teratas</h1>
      <table>
        <thead>
          <tr>
          <th>
              Simbol
            </th>
            <th>
              Harga
            </th>
            <th>
              24jam
            </th>
            <th>
              Kapital Pasar
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(coin => (
            <tr key={coin.id}>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{coin.current_price}</td>
              <td>{coin.price_change_percentage_24h}</td>
              <td>{coin.market_cap}</td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  )
}
export async function getServerSideProps(context){
  const params = {
    order : CoinGecko.ORDER.MARKET_CAP_DESC
  }
  const result = await CoinGeckoClient.coins.markets({params});
  return {
    props : {
      result
    }
  };
}
