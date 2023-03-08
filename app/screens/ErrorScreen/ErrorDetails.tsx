import React, { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle, TouchableOpacity, Text } from "react-native"
import { Screen } from "../../components"

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
  paddingHorizontal: 24,
  paddingTop: 32,
  flex: 1,
}

const $topSection: ViewStyle = {
  flex: 0.2,
  alignItems: "center",
}

const $heading: TextStyle = {
  color: "#C03403",
  marginBottom: 16,
  fontSize: 30,
  fontWeight: "bold",
  textAlign: "center",
}

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: "#D7CEC9",
  marginVertical: 16,
  borderRadius: 6,
}

const $buttonSection: ViewStyle = {
  flex: 0.2,
  alignItems: "center",
  justifyContent: "center",
}

const $errorSectionContentContainer: ViewStyle = {
  padding: 16,
}

const $errorContent: TextStyle = {
  color: "#C03403",
  fontWeight: "bold",
}

const $errorBacktrace: TextStyle = {
  marginTop: 16,
  color: "#564E4A",
}

const $resetButton: ViewStyle = {
  backgroundColor: "#C03403",
  paddingHorizontal: 48,
  paddingVertical: 12,
  borderRadius: 35,
}
