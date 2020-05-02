import React from "react";
import { Twitter, Facebook, Linkedin, Reddit } from 'react-social-sharing'

const Share = ({ hide, message, url, onClose }) => {
    return <div className={`modal ${hide ? "":"d-block"}`} tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                        onClick={() => onClose()}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <Twitter solidcircle big message={message} link={url} />
                    {/* <Facebook solidcircle big message={message} link={url} />
                    <Linkedin solidcircle big message={message} link={url} />
                    <Reddit solidcircle big message={message} link={url} /> */}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => onClose()}>Close</button>
                </div>
            </div>
        </div>
    </div>
}

export default Share;