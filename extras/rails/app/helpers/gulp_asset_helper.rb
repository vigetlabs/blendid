module GulpAssetHelper
  def gulp_asset_path(path, type = nil)
    rev_manifest = nil

    # In development, check for the manifest every time
    if Rails.env.development?
      rev_manifest = JSON.parse(File.read(REV_MANIFEST_PATH)) if File.exist?(REV_MANIFEST_PATH)
    # In production, use the manifest cached in initializers/gulp.rb
    else
      rev_manifest = REV_MANIFEST if defined?(REV_MANIFEST)
    end

    root = GULP_CONFIG['root']['dest'].gsub(/(.*)public\//, '/')
    asset_path = type ? File.join(GULP_CONFIG['tasks'][type]['dest'], path) : path
    asset_path = rev_manifest[asset_path] if rev_manifest
    asset_path = File.join(root, asset_path)
    File.absolute_path(asset_path, '/')
  end

  def gulp_js_path(path)
    gulp_asset_path(path, 'js')
  end

  def gulp_css_path(path)
    gulp_asset_path(path, 'css')
  end

  def gulp_image_path(path)
    gulp_asset_path(path, 'images')
  end

  def sprite(id, classes = "", viewBox = "0 0 24 24")
    "<svg class='sprite -#{id} #{classes}' aria-hidden='true' preserveAspectRatio viewBox='#{viewBox}'><use xlink:href='#{gulp_image_path('icons.svg')}##{id}' /></use></svg>".html_safe
  end
end
