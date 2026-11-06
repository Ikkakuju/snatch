// Renders the brand images that are not the logo itself:
//   packages/web/public/og.png   (1200×630 social card)
//   macos/AppIcon.png            (1024 app icon: the mark on a dark glass tile)
//
//   swift scripts/brand-assets.swift      # from the repository root
//
// The mark is packages/web/public/logo.svg redrawn path for path below: macOS
// rasterises the SVG's mask at 64 px, which leaves the play triangle jagged when
// scaled up. Change both together.
//
// ponytail: the app icon is a flat PNG, not a layered Icon Composer `.icon` (that needs
// Xcode's actool), so macOS shows it without the system's dynamic glass lighting.
import AppKit

let web = "packages/web/public"

func color(_ hex: UInt32, _ alpha: CGFloat = 1) -> CGColor {
	CGColor(
		srgbRed: CGFloat(hex >> 16 & 0xFF) / 255, green: CGFloat(hex >> 8 & 0xFF) / 255,
		blue: CGFloat(hex & 0xFF) / 255, alpha: alpha
	)
}

func gradient(_ colors: [CGColor], _ locations: [CGFloat]? = nil) -> CGGradient {
	CGGradient(colorsSpace: CGColorSpace(name: CGColorSpace.sRGB), colors: colors as CFArray, locations: locations)!
}

/// Draws into a new `width`×`height` bitmap (bottom-left origin) and writes it as PNG.
func render(_ path: String, _ width: Int, _ height: Int, _ draw: (CGContext) -> Void) {
	let bitmap = NSBitmapImageRep(
		bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height, bitsPerSample: 8,
		samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0,
		bitsPerPixel: 0
	)!
	NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
	draw(NSGraphicsContext.current!.cgContext)
	NSGraphicsContext.current = nil
	try! bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: path))
	print("Wrote \(path)")
}

/// logo.svg's mark in `rect` (its 64-unit box), with a soft shadow.
func drawMark(_ ctx: CGContext, in rect: CGRect, shadow: CGColor? = color(0x0B0630, 0.7)) {
	func point(_ x: CGFloat, _ y: CGFloat) -> CGPoint { CGPoint(x: x, y: y) }
	func linear(_ path: CGPath, _ colors: [CGColor], _ locations: [CGFloat]?, _ from: CGPoint, _ to: CGPoint) {
		ctx.saveGState()
		ctx.addPath(path)
		ctx.clip()
		ctx.drawLinearGradient(
			gradient(colors, locations), start: from, end: to,
			options: [.drawsBeforeStartLocation, .drawsAfterEndLocation]
		)
		ctx.restoreGState()
	}
	/// A polygon filled and stroked `width` wide with round joins, as the SVG draws it.
	func rounded(_ points: [CGPoint], _ width: CGFloat) -> CGPath {
		let path = CGMutablePath()
		path.addLines(between: points)
		path.closeSubpath()
		return path.copy(strokingWithWidth: width, lineCap: .round, lineJoin: .round, miterLimit: 10).union(path)
	}

	let scale = rect.width / 64
	ctx.saveGState()
	ctx.translateBy(x: rect.minX, y: rect.maxY)
	ctx.scaleBy(x: scale, y: -scale)
	if let shadow {
		ctx.setShadow(offset: CGSize(width: 0, height: -2.4 * scale), blur: 4.8 * scale, color: shadow)
	}
	ctx.beginTransparencyLayer(auxiliaryInfo: nil)

	linear(
		CGPath(ellipseIn: CGRect(x: 4, y: 39.5, width: 21, height: 21), transform: nil),
		[color(0x6F8CFF), color(0x2F52FF)], nil, point(0, 38), point(0, 62)
	)
	linear(
		rounded([point(15, 13), point(50, 31), point(15, 40)], 17),
		[color(0x5A3DF7), color(0xA35CF7), color(0x8B4CF4)], [0, 0.65, 1], point(8, 8), point(58, 38)
	)
	linear(
		rounded([point(17, 17), point(41, 29.5), point(17, 37)], 5),
		[color(0x2A1A9E), color(0x4B2EE6)], nil, point(14, 16), point(38, 42)
	)
	// The play triangle: a hole in the SVG, white as in logo512.png.
	ctx.addPath(rounded([point(25, 19.5), point(37.5, 26.5), point(25, 33.5)], 5))
	ctx.setFillColor(color(0xFFFFFF))
	ctx.fillPath()

	var tilt = CGAffineTransform(translationX: 35, y: 50).rotated(by: -27 * .pi / 180)
		.translatedBy(x: -35, y: -50)
	linear(
		CGPath(
			roundedRect: CGRect(x: 15, y: 41, width: 40, height: 18), cornerWidth: 9, cornerHeight: 9,
			transform: &tilt
		),
		[color(0x3A24D8), color(0x5A2EE8)], nil, point(18, 58), point(52, 38)
	)
	ctx.addPath(rounded(
		[
			point(30.5, 39), point(35.5, 39), point(35.5, 46), point(39.5, 46), point(33, 53),
			point(26.5, 46), point(30.5, 46),
		],
		1.6
	))
	ctx.setFillColor(color(0xFFFFFF))
	ctx.fillPath()

	ctx.endTransparencyLayer()
	ctx.restoreGState()
}

/// The part of the 64-unit box the mark actually paints: it sits off-centre in its
/// box, so it is centred by this, not by the box.
let markInk: CGRect = {
	let size = 1024
	let bitmap = NSBitmapImageRep(
		bitmapDataPlanes: nil, pixelsWide: size, pixelsHigh: size, bitsPerSample: 8, samplesPerPixel: 4,
		hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0
	)!
	NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
	drawMark(NSGraphicsContext.current!.cgContext, in: CGRect(x: 0, y: 0, width: size, height: size), shadow: nil)
	NSGraphicsContext.current = nil
	var (minX, minY, maxX, maxY) = (size, size, 0, 0)
	for y in 0..<size {
		for x in 0..<size where bitmap.colorAt(x: x, y: y)!.alphaComponent > 0.05 {
			(minX, maxX, minY, maxY) = (min(minX, x), max(maxX, x), min(minY, y), max(maxY, y))
		}
	}
	// Bitmap rows run top-down; the box is bottom-up, in 64ths.
	let unit = CGFloat(size) / 64
	return CGRect(
		x: CGFloat(minX) / unit, y: CGFloat(size - 1 - maxY) / unit,
		width: CGFloat(maxX - minX + 1) / unit, height: CGFloat(maxY - minY + 1) / unit
	)
}()

/// The rect to draw the mark's 64-unit box in so that what it paints is `side`
/// across at its longest and centred on `center`.
func markBox(center: CGPoint, side: CGFloat) -> CGRect {
	let scale = side / max(markInk.width, markInk.height)
	return CGRect(
		x: center.x - (markInk.midX) * scale, y: center.y - (markInk.midY) * scale,
		width: 64 * scale, height: 64 * scale
	)
}

func font(_ file: String, family: String, size: CGFloat, weight: NSFont.Weight) -> NSFont {
	CTFontManagerRegisterFontsForURL(URL(fileURLWithPath: "\(web)/fonts/\(file)") as CFURL, .process, nil)
	let descriptor = NSFontDescriptor(fontAttributes: [.family: family])
		.addingAttributes([.traits: [NSFontDescriptor.TraitKey.weight: weight]])
	return NSFont(descriptor: descriptor, size: size) ?? .systemFont(ofSize: size, weight: weight)
}

// The app icon: on Apple's 1024 grid (824 wide, 100 in), a white tile faintly lit by
// the brand blue-violet, the mark, a glass sheen over the top and a rim light.
render("macos/AppIcon.png", 1024, 1024) { ctx in
	let tile = CGRect(x: 100, y: 100, width: 824, height: 824)
	let tilePath = CGPath(roundedRect: tile, cornerWidth: 186, cornerHeight: 186, transform: nil)

	ctx.saveGState()
	ctx.setShadow(offset: CGSize(width: 0, height: -14), blur: 28, color: color(0, 0.3))
	ctx.addPath(tilePath)
	ctx.setFillColor(color(0xFFFFFF))
	ctx.fillPath()
	ctx.restoreGState()

	ctx.saveGState()
	ctx.addPath(tilePath)
	ctx.clip()
	ctx.drawLinearGradient(
		gradient([color(0xFFFFFF), color(0xF1EEFF)]),
		start: CGPoint(x: 0, y: tile.maxY), end: CGPoint(x: 0, y: tile.minY), options: []
	)
	ctx.drawRadialGradient(
		gradient([color(0x6D4BFF, 0.14), color(0x6D4BFF, 0)]),
		startCenter: CGPoint(x: 560, y: 600), startRadius: 0,
		endCenter: CGPoint(x: 560, y: 600), endRadius: 440, options: []
	)
	ctx.drawRadialGradient(
		gradient([color(0x2F52FF, 0.12), color(0x2F52FF, 0)]),
		startCenter: CGPoint(x: 300, y: 280), startRadius: 0,
		endCenter: CGPoint(x: 300, y: 280), endRadius: 340, options: []
	)
	ctx.restoreGState()

	// Centred a touch high: the shadow below adds visual weight.
	drawMark(ctx, in: markBox(center: CGPoint(x: 512, y: 520), side: 560), shadow: color(0x3A24D8, 0.28))

	ctx.saveGState()
	ctx.addPath(tilePath)
	ctx.clip()
	ctx.drawLinearGradient(
		gradient([color(0xFFFFFF, 0.16), color(0xFFFFFF, 0.03), color(0xFFFFFF, 0)], [0, 0.45, 0.5]),
		start: CGPoint(x: 0, y: tile.maxY), end: CGPoint(x: 0, y: tile.minY), options: []
	)
	ctx.restoreGState()

	ctx.saveGState()
	ctx.addPath(
		CGPath(roundedRect: tile.insetBy(dx: 3, dy: 3), cornerWidth: 183, cornerHeight: 183, transform: nil)
			.copy(strokingWithWidth: 6, lineCap: .round, lineJoin: .round, miterLimit: 1)
	)
	ctx.clip()
	ctx.drawLinearGradient(
		gradient([color(0xFFFFFF, 0.9), color(0x6D4BFF, 0.08), color(0x6D4BFF, 0.16)], [0, 0.6, 1]),
		start: CGPoint(x: tile.minX, y: tile.maxY), end: CGPoint(x: tile.maxX, y: tile.minY), options: []
	)
	ctx.restoreGState()
}

// The social card: the site's black canvas, the mark, the tagline and one mono line.
render("\(web)/og.png", 1200, 630) { ctx in
	ctx.setFillColor(color(0x000000))
	ctx.fill(CGRect(x: 0, y: 0, width: 1200, height: 630))
	// The hero's limb, out of frame: a violet glow in the bottom-right corner.
	ctx.drawRadialGradient(
		gradient([color(0xA78BFA, 0.28), color(0xA78BFA, 0)]),
		startCenter: CGPoint(x: 1180, y: 620), startRadius: 0,
		endCenter: CGPoint(x: 1180, y: 620), endRadius: 660, options: []
	)

	drawMark(ctx, in: markBox(center: CGPoint(x: 600, y: 470), side: 92), shadow: nil)

	func centered(_ text: String, y: CGFloat, font: NSFont, hex: UInt32) {
		let line = NSAttributedString(
			string: text,
			attributes: [
				.font: font,
				.foregroundColor: NSColor(cgColor: color(hex))!,
			]
		)
		line.draw(at: CGPoint(x: (1200 - line.size().width) / 2, y: y))
	}
	let display = font("geist-1.woff2", family: "Geist", size: 76, weight: .semibold)
	let mono = font("geist-mono-6.woff2", family: "Geist Mono", size: 22, weight: .medium)
	centered("Paste a link.", y: 300, font: display, hex: 0xEDEDED)
	centered("Keep the video.", y: 212, font: display, hex: 0xA78BFA)
	centered("FREE · OPEN SOURCE · 1,800+ SITES", y: 132, font: mono, hex: 0x8A8A8A)
	centered("snatchvideos.com", y: 48, font: mono, hex: 0x8A8A8A)
}
