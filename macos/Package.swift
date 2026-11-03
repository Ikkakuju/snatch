// swift-tools-version: 6.0
import PackageDescription

let package = Package(
	name: "Snatch",
	platforms: [.macOS(.v14)],
	targets: [
		// Everything that does not touch SwiftUI: tool provisioning, the yt-dlp
		// process, format choices and progress parsing. Tested on its own.
		.target(name: "SnatchCore"),
		.executableTarget(name: "Snatch", dependencies: ["SnatchCore"]),
		.testTarget(name: "SnatchCoreTests", dependencies: ["SnatchCore"]),
	]
)
