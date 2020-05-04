import React from "react";
import { Twitter, Facebook, Linkedin, Reddit } from 'react-social-sharing'

const Share = ({ hide, message, url, onClose }) => {
    return <>
        <div className={`modal ${hide ? "":"d-block"}`} tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                    <h3 className="text-center mt-4">Share your commitment to code every day for 100 days:</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                        onClick={() => onClose()}
                        >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body social-share pt-0">
                    <Twitter style={{ marginLeft: 0 }} solidcircle message={message} link={url} />
                    <Facebook solidcircle message={message} link={url} />
                    <Linkedin solidcircle message={message} link={url} />
                    <Reddit solidcircle style={{ background: "#FF3D1E", marginRight: 0 }} message={message} link={url} /> 
                </div>
                {/* <div className="modal-footer border-0">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => onClose()}>Close</button>
                </div> */}
            </div>
        </div>
    </div>
    { hide === false && <div className="modal-backdrop" onClick={() => onClose()}></div> }
    </>
}

export default Share;