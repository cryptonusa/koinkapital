import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api'

const CoinGeckoClient = new CoinGecko()
export default function Home(props) {
  const { data } = props.result

  const formatPercent = number => `${new Number(number).toFixed(2)} %`
  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat('en-US', {style:'currency', currency:'usd', maximumSignificantDigits}).format(number)

  return (
    <div className={styles.container}>
      <Head>
        <title>Kapitalisasi Pasar Crypto</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Daftar 100 Kapitalisasi Pasar Crypto Teratas</h1>
        <table className='table'>
          <thead class="thead-dark">
            <tr>
              <th>
                Urut
              </th>
              <th>
                CryptoCurrency
              </th>
              <th>
                Harga ($)
              </th>
              <th>
                24 jam
              </th>
              <th>
                Terendah 24 jam
              </th>
              <th>
                Tertinggi 24 jam
              </th>
              <th>
                Volume 24 jam
              </th>
              <th>
                Kapital Pasar
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(coin => (
              <tr key={coin.id}>
                <td>{coin.market_cap_rank}</td>
                <td>
                  <img src = {coin.image} style = {{width:25, height:25, marginRight:10 }}/>
                  {coin.name}({coin.symbol.toUpperCase()})
                  </td>
                <td>{formatDollar(coin.current_price,20)}</td>
                <td>
                  <span className={coin.price_change_percentage_24h > 0 ? ('text-success'): 'text-danger'}>
                    {formatPercent(coin.price_change_percentage_24h)}
                  </span>
                </td>
                <td>{formatDollar(coin.low_24h,20)}</td>
                <td>{formatDollar(coin.high_24h,20)}</td>
                <td>{formatDollar(coin.total_volume,12)}</td>
                <td>{formatDollar(coin.market_cap,12)}</td>
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
  const result = await CoinGeckoClient.coins.markets({params})
  return {
    props : {
      result
    }
  }
}
