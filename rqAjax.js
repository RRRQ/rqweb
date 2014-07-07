
function rqAjax()
{
    this.XMLHttp = initialize();

    //XMLHttpRequestオブジェクト生成
    function initialize()
    {
        if( window.XMLHttpRequest )
        {
            //Win ie以外のXMLHttpRequestオブジェクト実装ブラウザ用
            return new XMLHttpRequest();
        }
        else if( window.ActiveXObject )
        {
            //Win ie用
            try
            {
                //MSXML2以降用
                return new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e)
            {
                try
                {
                    //旧MSXML用
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e2)
                {
                    return null;
                }
            }
        }
        else
        {
            return null;
        }
    }
    
    // get
    this.requestGET = function ( filename, callback )
    {
        this.requestFile( "cachecanceler=" + new Date(), "GET", filename, callback );
    }

    // post
    this.requestPOST = function ( filename, data, callback )
    {
        this.requestFile( data, "POST", filename, callback );
    }

    //ファイルにアクセスし受信内容を確認します
    this.requestFile = function ( data, method, filename, callback )
    {
        var xmlhttp = this.XMLHttp;

        //open メソッド
        xmlhttp.open( method, filename, true );

        // requestヘッダ設定
        if( method == "POST" )
        {
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
        }

        //受信時に起動するイベント
        xmlhttp.onreadystatechange = function()
        { 
            //readyState値は4で受信完了
            if( xmlhttp.readyState == 4 )
            { 
                //コールバック
                callback( xmlhttp.responseText );
            }
        }

        //send メソッド
        xmlhttp.send( data );
    }

    // スクリプトを動的ロード
    this.addScript = function ( src )
    {
        var head = document.getElementsByTagName("head").item(0);

        // Create the script tag
        var obj = document.createElement("script");

        obj.setAttribute("type", "text/javascript");
        obj.setAttribute("src", src );

        head.appendChild( obj );
        
        return obj;
    }

    // スクリプトを削除
    this.removeScript = function ( obj )
    {
        if( obj )
        {
            var head = document.getElementsByTagName("head").item(0);

            head.removeChild( obj );
        }
    }
}
