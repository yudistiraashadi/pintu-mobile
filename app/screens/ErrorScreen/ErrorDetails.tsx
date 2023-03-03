import React, { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle, TouchableOpacity, Text } from "react-native"
import { Screen } from "../../components"
import { colors, spacing } from "../../theme"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$contentContainer}
    >
      <View style={$topSection}>
        <Text style={$heading}>Terjadi Kesalahan!</Text>
      </View>

      <ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>
        <Text style={$errorContent}>{`${props.error}`.trim()}</Text>
        <Text selectable style={$errorBacktrace}>
          {`${props.errorInfo.componentStack}`.trim()}
        </Text>
      </ScrollView>

      <View style={$buttonSection}>
        <TouchableOpacity style={$resetButton} onPress={props.onReset}>
          <Text style={{ color: "white" }}>RESET APP</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.large,
  paddingTop: spacing.extraLarge,
  flex: 1,
}

const $topSection: ViewStyle = {
  flex: 0.2,
  alignItems: "center",
}

const $heading: TextStyle = {
  color: colors.error,
  marginBottom: spacing.medium,
  fontSize: 30,
  fontWeight: "bold",
  textAlign: "center",
}

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: colors.separator,
  marginVertical: spacing.medium,
  borderRadius: 6,
}

const $buttonSection: ViewStyle = {
  flex: 0.2,
  alignItems: "center",
  justifyContent: "center",
}

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.medium,
}

const $errorContent: TextStyle = {
  color: colors.error,
  fontWeight: "bold",
}

const $errorBacktrace: TextStyle = {
  marginTop: spacing.medium,
  color: colors.textDim,
}

const $resetButton: ViewStyle = {
  backgroundColor: colors.error,
  paddingHorizontal: spacing.huge,
  paddingVertical: spacing.small,
  borderRadius: 35,
}
