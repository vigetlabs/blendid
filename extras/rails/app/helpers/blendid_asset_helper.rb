module BlendidAssetHelper
  def blendid_asset_path(path, type = nil)
    root = ASSET_PATH_CONFIG['dest'].gsub(/(.*)public\//, '/')
    asset_path = type ? File.join(ASSET_PATH_CONFIG[type]['dest'], path) : path
    if rev_manifest
      raise "#{asset_path} not found in rev_manifest.json. Fix path or try rebuilding with `yarn run blendid -- build` from `/client_side`." if rev_manifest[asset_path].nil?
      asset_path = rev_manifest[asset_path]
    end
    File.absolute_path(File.join(root, asset_path), '/')
  end

  def blendid_js_path(path)
    blendid_asset_path(path, 'javascripts')
  end

  def blendid_css_path(path)
    blendid_asset_path(path, 'stylesheets')
  end

  def blendid_image_path(path)
    blendid_asset_path(path, 'images')
  end

  def icon(id, label = false, classes = "", viewBox = "0 0 24 24")
    svg = <<-ICON
    <svg class='icon -#{id} #{classes}' #{label ? "aria-label=#{label}" : "aria-hidden='true'"} preserveAspectRatio viewBox='#{viewBox}' width="24px" height="24px">
      <use xlink:href='#{blendid_image_path('icons.svg')}##{id}'></use>
    </svg>
    ICON
    svg.html_safe
  end

  private

  def rev_manifest
    if Rails.env.development?
      JSON.parse(File.read(REV_MANIFEST_PATH)) if File.exist?(REV_MANIFEST_PATH)
    else
      # In production, use the manifest cached in initializers/blendid.rb
      REV_MANIFEST if defined?(REV_MANIFEST)
    end
  end
end
