import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { Screen, Header } from "../components"
import { AppStackScreenProps } from "../navigators"

import { Box, Text } from "native-base"
import { useQuery, useQueryClient } from "react-query"
import axios from "axios"

interface MarketScreenProps extends AppStackScreenProps<"Market"> {}

/**
 * Main Function
 */
export const MarketScreen: FC<MarketScreenProps> = observer(function MarketScreen() {
  const queryClient = useQueryClient()

  const pricesQuery = useQuery<any, Error>(
    "prices",
    async () => {
      const res = await axios.get("https://api.pintu.co.id/v2/trade/price-changes")
      return res.data.payload
    },
    {
      refetchInterval: 2000,
    },
  )

  const currencyQuery = useQuery<any, Error>("currencies", async () => {
    const res = await axios.get("https://api.pintu.co.id/v2/wallet/supportedCurrencies")
    return res.data.payload
  })

  /**
   * Render header
   */
  const _renderHeader = () => <Header backgroundColor="white" title={"Market"} />

  const _renderListItem = ({ currency, price }) => {
    return (
      <Box
        key={currency.currencyGroup}
        w={"100%"}
        paddingY={2}
        paddingX={4}
        borderBottomWidth={0.25}
        borderBottomColor={"#333"}
      >
        <Box flexDir={"row"} alignItems={"center"}>
          {/* icon */}
          <Box
            width={12}
            height={12}
            borderRadius={"full"}
            bgColor={currency.color}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text color={"white"}>{currency.currencySymbol}</Text>
          </Box>

          {/* name */}
          <Box flex={1} paddingX={2}>
            <Text fontWeight={"bold"}>{currency.name}</Text>

            <Text>{currency.currencyGroup}</Text>
          </Box>

          {/* price */}
          <Box flex={1} paddingX={2} justifyContent={"flex-end"} alignItems={"flex-end"}>
            <Text fontWeight={"bold"}>
              Rp {Intl.NumberFormat("id-ID").format(price.latestPrice)}
            </Text>

            <Text>{price.day} %</Text>
          </Box>
        </Box>
      </Box>
    )
  }

  const _renderList = () => {
    if (pricesQuery.isLoading || currencyQuery.isLoading) return <Text>Loading...</Text>

    if (pricesQuery.isError) return <Text>Error: {pricesQuery.error.message}</Text>

    if (currencyQuery.isError) return <Text>Error: {currencyQuery.error.message}</Text>

    return (
      <Box>
        {currencyQuery.data
          .filter((i) => i.currencyGroup !== "IDR")
          .map((currency) => {
            let pricePair = currency.currencyGroup.toLowerCase() + "/idr"
            let price = pricesQuery.data.find((item) => item.pair == pricePair)

            if (price) {
              let itemData = {
                currency,
                price,
              }

              return _renderListItem(itemData)
            }

            return null
          })}
      </Box>
    )
  }

  /**
   * Main Return
   */
  return (
    <>
      {/* Header */}
      {_renderHeader()}

      <Screen preset={"scroll"} style={$screen}>
        {/* Content */}
        {_renderList()}
      </Screen>
    </>
  )
})

const $screen: ViewStyle = {
  flex: 1,
  backgroundColor: "white",
}
