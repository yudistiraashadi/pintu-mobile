import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ViewStyle } from "react-native"
import { Screen, Header } from "../components"
import { AppStackScreenProps } from "../navigators"

import { Box, CheckIcon, Select, Text } from "native-base"
import { useQuery, useQueryClient } from "react-query"
import axios from "axios"

interface MarketScreenProps extends AppStackScreenProps<"Market"> {}

/**
 * Main Function
 */
export const MarketScreen: FC<MarketScreenProps> = observer(function MarketScreen() {
  const queryClient = useQueryClient()

  const [sortBy, setSortBy] = useState("default")

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

  const _renderHeader = () => <Header backgroundColor="white" title={"Market"} />

  const _renderSorting = () => (
    <Box bgColor={"white"} flexDir={"row"} alignItems={"center"} justifyContent={"flex-end"}>
      <Text mr={2}>Sort by:</Text>
      <Select
        bgColor={"white"}
        selectedValue={sortBy}
        minWidth="150"
        accessibilityLabel="Choose Sort"
        placeholder="Choose Sort"
        mt={1}
        _selectedItem={{
          bg: "teal.500",
          endIcon: <CheckIcon size="5" />,
        }}
        onValueChange={(itemValue) => setSortBy(itemValue)}
      >
        <Select.Item label="Default" value="default" />
        <Select.Item label="Name Asc" value="name-asc" />
        <Select.Item label="Name Desc" value="name-desc" />
      </Select>
    </Box>
  )

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
          .sort((a, b) => {
            if (sortBy === "name-asc") {
              if (a.currencyGroup.toLowerCase() < b.currencyGroup.toLowerCase()) return -1
              if (a.currencyGroup.toLowerCase() > b.currencyGroup.toLowerCase()) return 1
            }

            if (sortBy === "name-desc") {
              if (a.currencyGroup.toLowerCase() < b.currencyGroup.toLowerCase()) return 1
              if (a.currencyGroup.toLowerCase() > b.currencyGroup.toLowerCase()) return -1
            }

            return 1
          })
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
      {_renderHeader()}

      {_renderSorting()}

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
