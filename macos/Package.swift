// swift-tools-version: 6.0
import PackageDescription

let package = Package(
	name: "Snatch",
	platforms: [.macOS(.v14)],
	dependencies: [
		// Sparkle 2 is the only third-party package: the app updates itself through
		// its appcast, and the framework is embedded and signed by scripts/bundle.sh.
		.package(url: "https://github.com/sparkle-project/Sparkle", exact: "2.10.1"),
	],
	targets: [
		// Everything that does not touch SwiftUI: tool provisioning, the yt-dlp
		// process, format choices and progress parsing. Tested on its own.
		.target(name: "SnatchCore"),
		.executableTarget(
			name: "Snatch",
			dependencies: [
				"SnatchCore",
				.product(name: "Sparkle", package: "Sparkle"),
			],
			// bundle.sh puts Sparkle.framework in Contents/Frameworks; a bare
			// `swift run` binary still finds it in SwiftPM's artifacts directory.
			linkerSettings: [
				.unsafeFlags(["-Xlinker", "-rpath", "-Xlinker", "@executable_path/../Frameworks"])
			]
		),
		.testTarget(name: "SnatchCoreTests", dependencies: ["SnatchCore"]),
	]
)
