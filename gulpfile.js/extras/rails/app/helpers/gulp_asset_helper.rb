module GulpAssetHelper
  def gulp_asset_path(path, type = nil)
    root = GULP_CONFIG['root']['dest'].gsub(/(.*)public\//, '/')
    asset_path = type ? File.join(GULP_CONFIG['tasks'][type]['dest'], path) : path
    asset_path = REV_MANIFEST[asset_path] if defined?(REV_MANIFEST)
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
end
