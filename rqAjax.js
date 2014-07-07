
function rqAjax()
{
    this.XMLHttp = initialize();

    //XMLHttpRequest�I�u�W�F�N�g����
    function initialize()
    {
        if( window.XMLHttpRequest )
        {
            //Win ie�ȊO��XMLHttpRequest�I�u�W�F�N�g�����u���E�U�p
            return new XMLHttpRequest();
        }
        else if( window.ActiveXObject )
        {
            //Win ie�p
            try
            {
                //MSXML2�ȍ~�p
                return new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e)
            {
                try
                {
                    //��MSXML�p
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

    //�t�@�C���ɃA�N�Z�X����M���e���m�F���܂�
    this.requestFile = function ( data, method, filename, callback )
    {
        var xmlhttp = this.XMLHttp;

        //open ���\�b�h
        xmlhttp.open( method, filename, true );

        // request�w�b�_�ݒ�
        if( method == "POST" )
        {
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); 
        }

        //��M���ɋN������C�x���g
        xmlhttp.onreadystatechange = function()
        { 
            //readyState�l��4�Ŏ�M����
            if( xmlhttp.readyState == 4 )
            { 
                //�R�[���o�b�N
                callback( xmlhttp.responseText );
            }
        }

        //send ���\�b�h
        xmlhttp.send( data );
    }

    // �X�N���v�g�𓮓I���[�h
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

    // �X�N���v�g���폜
    this.removeScript = function ( obj )
    {
        if( obj )
        {
            var head = document.getElementsByTagName("head").item(0);

            head.removeChild( obj );
        }
    }
}
